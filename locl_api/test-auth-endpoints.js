// Test script for Authentication Endpoints
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000';

async function testAuthEndpoints() {
  console.log('🔐 Testing Authentication Endpoints\n');

  try {
    // Test 1: Login with email and password (Admin SDK + REST API)
    console.log('1️⃣ Testing Email/Password Login (Admin SDK + REST API)...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });

    console.log('✅ Email/Password login successful!');
    console.log('📄 Response:', {
      access_token: loginResponse.data.access_token.substring(0, 50) + '...',
      user: loginResponse.data.user,
      expires_in: loginResponse.data.expires_in
    });

    const accessToken = loginResponse.data.access_token;

    // Test 2: Get user profile (protected route)
    console.log('\n2️⃣ Testing Profile Endpoint...');
    const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log('✅ Profile retrieved successfully!');
    console.log('👤 User profile:', profileResponse.data);

    // Test 3: Verify token
    console.log('\n3️⃣ Testing Token Verification...');
    const verifyResponse = await axios.post(`${API_BASE_URL}/auth/verify`, {
      token: accessToken
    });

    console.log('✅ Token verification successful!');
    console.log('🔍 Verification result:', verifyResponse.data);

    console.log('\n🎉 All authentication endpoints are working correctly!');

  } catch (error) {
    if (error.response) {
      console.error('❌ API Error:', {
        status: error.response.status,
        message: error.response.data.message || error.response.data,
        endpoint: error.config.url
      });
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Connection Error: Make sure your NestJS API is running on port 3000');
      console.log('💡 Start your API with: npm run dev');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

// Helper function to create a test user first
async function createTestUser() {
  console.log('👤 Creating test user...');
  try {
    // This would typically be done through Firebase Admin SDK or emulator UI
    console.log('💡 To create a test user:');
    console.log('   1. Start Firebase emulator: npm run emulators');
    console.log('   2. Go to http://localhost:4000');
    console.log('   3. Navigate to Authentication tab');
    console.log('   4. Add user with email: test@example.com, password: password123');
    console.log('   5. Or use the test script: node test-emulator.js\n');
  } catch (error) {
    console.error('Error creating test user:', error.message);
  }
}

// Run the tests
console.log('🚀 Starting Authentication Endpoint Tests\n');
createTestUser();
setTimeout(() => {
  testAuthEndpoints();
}, 2000);
