// Test script for Firebase Emulator integration
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

// Emulator configuration
const firebaseConfig = {
  apiKey: 'demo-key',
  authDomain: 'demo-project.firebaseapp.com',
  projectId: 'demo-project',
  storageBucket: 'demo-project.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef',
};

async function testEmulator() {
  try {
    console.log('🔥 Initializing Firebase with emulator...');
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    // Connect to emulator
    auth.useEmulator('http://localhost:9099');
    
    console.log('✅ Connected to Firebase Auth emulator');
    
    // Test creating a user
    console.log('👤 Creating test user...');
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'test@example.com', 
      'password123'
    );
    
    console.log('✅ User created:', userCredential.user.email);
    
    // Test signing in
    console.log('🔐 Testing sign in...');
    const signInCredential = await signInWithEmailAndPassword(
      auth,
      'test@example.com',
      'password123'
    );
    
    console.log('✅ Sign in successful:', signInCredential.user.email);
    
    // Get ID token
    const idToken = await signInCredential.user.getIdToken();
    console.log('🎫 ID Token received:', idToken.substring(0, 50) + '...');
    
    console.log('\n🎉 All tests passed! Emulator is working correctly.');
    console.log('📱 You can now test your NestJS API with these credentials:');
    console.log('   Email: test@example.com');
    console.log('   Password: password123');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the Firebase emulator is running:');
    console.log('   npm run emulators');
  }
}

testEmulator();
