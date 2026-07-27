const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 Table Generator
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function processLogo() {
  const inputPath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\e4917d9c-f062-49b3-ac17-6e2939976673\\media__1785002520134.png';
  const outputPath = path.join(__dirname, '..', 'public', 'logo-transparent.png');

  const buf = fs.readFileSync(inputPath);

  let width = 1024, height = 1024;
  let idatBuffers = [];

  let pos = 8;
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
    } else if (type === 'IDAT') {
      idatBuffers.push(buf.subarray(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }

  const compressed = Buffer.concat(idatBuffers);
  const decompressed = zlib.inflateSync(compressed);

  const bpp = 4;
  const rowSize = width * bpp;
  const stride = rowSize + 1;

  // Un-filter PNG scanlines
  const uncompressed = Buffer.alloc(height * rowSize);

  function paeth(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
  }

  for (let y = 0; y < height; y++) {
    const filter = decompressed[y * stride];
    const prevRow = y > 0 ? uncompressed.subarray((y - 1) * rowSize, y * rowSize) : null;
    const currRow = uncompressed.subarray(y * rowSize, (y + 1) * rowSize);
    const rawRow = decompressed.subarray(y * stride + 1, (y + 1) * stride);

    for (let x = 0; x < rowSize; x++) {
      const left = x >= bpp ? currRow[x - bpp] : 0;
      const up = prevRow ? prevRow[x] : 0;
      const upLeft = (prevRow && x >= bpp) ? prevRow[x - bpp] : 0;

      let val = rawRow[x];
      if (filter === 1) val = (val + left) & 0xff;
      else if (filter === 2) val = (val + up) & 0xff;
      else if (filter === 3) val = (val + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) val = (val + paeth(left, up, upLeft)) & 0xff;

      currRow[x] = val;
    }
  }

  // Remove black background with smooth alpha feathering
  for (let i = 0; i < uncompressed.length; i += 4) {
    const r = uncompressed[i];
    const g = uncompressed[i + 1];
    const b = uncompressed[i + 2];
    const maxColor = Math.max(r, g, b);

    if (maxColor < 22) {
      uncompressed[i + 3] = 0; // Transparent
    } else if (maxColor < 75) {
      // Smooth anti-aliased edge transition
      const alpha = Math.min(255, Math.floor((maxColor - 22) * (255 / 53)));
      uncompressed[i + 3] = Math.floor((uncompressed[i + 3] * alpha) / 255);
    }
  }

  // Re-encode scanlines (Filter type 0)
  const filteredOutput = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y++) {
    filteredOutput[y * stride] = 0; // Filter None
    uncompressed.copy(filteredOutput, y * stride + 1, y * rowSize, (y + 1) * rowSize);
  }

  const newIdat = zlib.deflateSync(filteredOutput, { level: 9 });

  // Construct valid PNG file
  function createChunk(typeStr, dataBuf) {
    const typeBuf = Buffer.from(typeStr, 'ascii');
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(dataBuf.length, 0);

    const crcBuf = Buffer.alloc(4);
    const toCrc = Buffer.concat([typeBuf, dataBuf]);
    crcBuf.writeUInt32BE(crc32(toCrc), 0);

    return Buffer.concat([lenBuf, typeBuf, dataBuf, crcBuf]);
  }

  const header = Buffer.from('89504e470d0a1a0a', 'hex');

  // IHDR chunk
  const ihdrBuf = Buffer.alloc(13);
  ihdrBuf.writeUInt32BE(width, 0);
  ihdrBuf.writeUInt32BE(height, 4);
  ihdrBuf[8] = 8; // 8 bit
  ihdrBuf[9] = 6; // RGBA
  ihdrBuf[10] = 0;
  ihdrBuf[11] = 0;
  ihdrBuf[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdrBuf);

  // IDAT chunk
  const idatChunk = createChunk('IDAT', newIdat);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  const finalPng = Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(outputPath, finalPng);
  console.log('Successfully written transparent PNG to:', outputPath, 'Size:', finalPng.length);
}

processLogo();
