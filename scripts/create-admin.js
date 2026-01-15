/**
 * Script to create a new admin user in Firebase Authentication
 * 
 * Usage: node scripts/create-admin.js <email> <password>
 * Example: node scripts/create-admin.js admin@ebirth.net MySecurePass123!
 */

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration (same as client)
const firebaseConfig = {
  apiKey: "AIzaSyD10CQuuqrvoOBEeak4fejOSzu0C67_jhI",
  authDomain: "ebirth-landingpage.firebaseapp.com",
  projectId: "ebirth-landingpage",
  storageBucket: "ebirth-landingpage.firebasestorage.app",
  messagingSenderId: "551833814806",
  appId: "1:551833814806:web:734003bf3541b0fc18b237",
  measurementId: "G-59B7PLF0L9"
};

// Get command line arguments
const args = process.argv.slice(2);
const email = args[0];
const password = args[1];

// Validate inputs
if (!email || !password) {
  console.error('❌ Error: Email and password are required!');
  console.log('\nUsage: node scripts/create-admin.js <email> <password>');
  console.log('Example: node scripts/create-admin.js admin@ebirth.net MySecurePass123!\n');
  process.exit(1);
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  console.error('❌ Error: Invalid email format!');
  process.exit(1);
}

// Validate password strength
if (password.length < 6) {
  console.error('❌ Error: Password must be at least 6 characters long!');
  process.exit(1);
}

// Create admin user
async function createAdminUser() {
  console.log('\n🔥 Initializing Firebase...');
  
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    console.log('📧 Creating admin user...');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${'*'.repeat(password.length)}`);
    
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('\n✅ SUCCESS! Admin user created successfully!');
    console.log('─'.repeat(50));
    console.log(`👤 User ID: ${user.uid}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`🕒 Created: ${new Date().toLocaleString()}`);
    console.log('─'.repeat(50));
    console.log('\n🎉 You can now login at:');
    console.log('   • Local: http://localhost:5173/admin/login');
    console.log('   • Production: https://your-domain.com/admin/login\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ ERROR creating admin user:');
    
    if (error.code === 'auth/email-already-in-use') {
      console.error('   This email is already registered!');
      console.error('   Try a different email or use the existing credentials.\n');
    } else if (error.code === 'auth/weak-password') {
      console.error('   Password is too weak!');
      console.error('   Use at least 6 characters with mixed case and numbers.\n');
    } else if (error.code === 'auth/invalid-email') {
      console.error('   Invalid email format!\n');
    } else {
      console.error(`   ${error.message}\n`);
    }
    
    process.exit(1);
  }
}

// Run the script
createAdminUser();
