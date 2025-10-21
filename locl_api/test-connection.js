const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    console.log('🔄 Testing Supabase connection...');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Database: ${process.env.DB_DATABASE}`);
    console.log(`User: ${process.env.DB_USERNAME}`);
    
    await client.connect();
    console.log('✅ Successfully connected to Supabase!');
    
    const result = await client.query('SELECT NOW() as current_time');
    console.log('📅 Current database time:', result.rows[0].current_time);
    
    await client.end();
    console.log('🔌 Connection closed successfully');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your .env file has correct Supabase credentials');
    console.log('2. Verify your Supabase project is active');
    console.log('3. Ensure your database password is correct');
    console.log('4. Check if your IP is whitelisted in Supabase (if using IP restrictions)');
  }
}

testConnection();
