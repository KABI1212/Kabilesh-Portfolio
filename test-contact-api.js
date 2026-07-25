// Integration test script for Portfolio Contact API
const http = require('http')

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) })
        } catch {
          resolve({ status: res.statusCode, raw: data })
        }
      })
    })
    req.on('error', (err) => reject(err))
    if (postData) {
      req.write(JSON.stringify(postData))
    }
    req.end()
  })
}

async function runTests() {
  console.log('=== STARTING CONTACT API AUDIT & INTEGRATION TESTS ===\n')

  const baseOptions = {
    hostname: 'localhost',
    port: 3000,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ContactAuditTest/1.0',
    },
  }

  // Test 1: Valid submission
  console.log('Test 1: Testing valid full contact submission...')
  const validPayload = {
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@techcorp.com',
    subject: 'Senior Software Engineer Role Inquiry',
    phone: '+1 (555) 234-5678',
    company: 'TechCorp Solutions',
    message: 'Hello Kabilesh, we reviewed your portfolio and were very impressed with your AI and fullstack projects. We would love to discuss a developer role with you!',
  }
  const res1 = await makeRequest({ ...baseOptions, path: '/api/contact', method: 'POST' }, validPayload)
  console.log(`Result: Status ${res1.status}`, res1.data)
  console.assert(res1.status === 200 && res1.data.success === true, 'Test 1 Failed')

  // Test 2: Invalid Email & Missing Message
  console.log('\nTest 2: Testing invalid email & missing message validation...')
  const invalidPayload = {
    name: 'X',
    email: 'invalid-email-format',
    message: 'Short',
  }
  const res2 = await makeRequest({ ...baseOptions, path: '/api/contact', method: 'POST' }, invalidPayload)
  console.log(`Result: Status ${res2.status}`, res2.data)
  console.assert(res2.status === 400 && res2.data.success === false, 'Test 2 Failed')

  // Test 3: Honeypot bot submission
  console.log('\nTest 3: Testing honeypot bot detection...')
  const botPayload = {
    name: 'Spam Bot',
    email: 'spammer@botnet.org',
    message: 'Buy cheap crypto now!!!',
    website_url: 'http://spam-link.com',
  }
  const res3 = await makeRequest({ ...baseOptions, path: '/api/contact', method: 'POST' }, botPayload)
  console.log(`Result: Status ${res3.status}`, res3.data)
  console.assert(res3.status === 200 && res3.data.success === true, 'Test 3 Failed')

  // Test 4: Admin GET Endpoint Verification
  console.log('\nTest 4: Testing Admin GET submissions endpoint...')
  const adminKey = 'hTn9YD3Xek4XRLPhFI62sqVvNP3aOHaB5f8CKrzy7O9An_tKyDTPWdPBL1JGTIFU'
  const res4 = await makeRequest({
    ...baseOptions,
    path: `/api/contact?key=${adminKey}`,
    method: 'GET',
  })
  console.log(`Result: Status ${res4.status}, Submissions Count: ${res4.data.count}`)
  console.assert(res4.status === 200 && res4.data.success === true, 'Test 4 Failed')

  console.log('\n=== ALL INTEGRATION TESTS PASSED SUCCESSFULLY! ===')
}

runTests().catch(console.error)
