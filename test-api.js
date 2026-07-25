// @ts-nocheck
// Test script for the contact API
const http = require('http');

const data = JSON.stringify({
  name: 'Test User',
  email: 'test@example.com',
  message: 'Testing the contact form from test script'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
    try {
      const parsed = JSON.parse(body);
      if (parsed.success) {
        console.log('✓ API test PASSED');
      } else {
        console.log('✗ API test FAILED:', parsed.error);
      }
    } catch (e) {
      console.log('✗ Failed to parse response:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error('Request failed:', e.message);
});

req.write(data);
req.end();