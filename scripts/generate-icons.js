const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function main() {
  const root = path.join(__dirname, '..');
  const logoPath = path.join(root, 'public', 'logo-transparent.png');

  if (!fs.existsSync(logoPath)) {
    console.error('Logo path does not exist:', logoPath);
    return;
  }

  // 1. Generate 512x512 app/icon.png
  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(root, 'app', 'icon.png'));

  // 2. Generate 180x180 app/apple-icon.png
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(root, 'app', 'apple-icon.png'));

  // 3. Generate 32x32 public/favicon.ico
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(root, 'public', 'favicon.ico'));

  // 4. Generate 512x512 public/icon.png
  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(root, 'public', 'icon.png'));

  // 5. Generate app/icon.svg with embedded base64
  const buf256 = await sharp(logoPath)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const b64 = buf256.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <image href="data:image/png;base64,${b64}" x="0" y="0" width="256" height="256" />
</svg>`;

  fs.writeFileSync(path.join(root, 'app', 'icon.svg'), svg);

  console.log('All icons generated successfully!');
}

main().catch(console.error);
