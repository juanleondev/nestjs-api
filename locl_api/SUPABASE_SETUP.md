# Supabase Database Setup Guide

This guide explains how to connect your NestJS application to a Supabase PostgreSQL database.

## 🔑 Where to Get Supabase Credentials

### 1. Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project or create a new one

### 2. Get Database Credentials
1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection Info** section
3. You'll find:
   - **Host**: `db.your-project-ref.supabase.co`
   - **Database name**: `postgres`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: Your database password (set during project creation)

### 3. Get API Keys (Optional)
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **anon public key**: For client-side operations

## 📝 Environment Configuration

### Update your `.env` file with actual Supabase credentials:

```env
# Supabase Database Configuration
DB_HOST=db.your-project-ref.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-actual-database-password
DB_DATABASE=postgres

# Supabase Connection Pool (Optional - for better performance)
DB_POOL_SIZE=10
DB_POOL_TIMEOUT=30000

# Application Configuration
NODE_ENV=development
PORT=3000

# Supabase URL and API Key (if you need them for other services)
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## 🔧 Configuration Features

### SSL Configuration
- **Development**: SSL disabled for local development
- **Production**: SSL enabled with `rejectUnauthorized: false` for Supabase

### Connection Pooling
- **Max connections**: 10 (configurable via `DB_POOL_SIZE`)
- **Idle timeout**: 30 seconds
- **Connection timeout**: 2 seconds

### Database Settings
- **Synchronize**: Enabled in development (auto-creates tables)
- **Logging**: Enabled in development (shows SQL queries)
- **Migrations**: Ready for production use

## 🚀 Testing the Connection

### 1. Start the Application
```bash
npm run start:dev
```

### 2. Check Connection
Look for these logs in your terminal:
```
[Nest] 12345  - 01/01/2024, 10:00:00 AM     LOG [TypeOrmModule] TypeORM connection established
```

### 3. Test API Endpoints
```bash
# Create a community
curl -X POST http://localhost:3000/communities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Community",
    "description": "Testing Supabase connection",
    "location": "Online"
  }'

# Get all communities
curl http://localhost:3000/communities
```

## 🔒 Security Best Practices

### 1. Environment Variables
- **Never commit** `.env` file to version control
- Use `.env.example` for template
- Set different credentials for different environments

### 2. Database Security
- Use strong passwords
- Enable Row Level Security (RLS) in Supabase
- Set up proper database policies

### 3. Production Considerations
- Use connection pooling
- Set up monitoring
- Configure proper SSL settings
- Use environment-specific configurations

## 🛠️ Troubleshooting

### Common Issues

#### 1. Connection Refused
```
Error: connect ECONNREFUSED
```
**Solution**: Check if your Supabase project is active and credentials are correct

#### 2. SSL Certificate Error
```
Error: self signed certificate
```
**Solution**: The configuration already handles this with `rejectUnauthorized: false`

#### 3. Authentication Failed
```
Error: password authentication failed
```
**Solution**: Verify your database password in Supabase dashboard

#### 4. Database Not Found
```
Error: database "locl_api" does not exist
```
**Solution**: Use `postgres` as the database name (Supabase default)

## 📊 Monitoring

### Supabase Dashboard
- Monitor database performance
- View connection metrics
- Check query performance
- Review logs

### Application Logs
- Connection status
- SQL query logs (development)
- Error messages
- Performance metrics

## 🔄 Next Steps

1. **Update credentials** in `.env` file
2. **Test the connection** by starting the app
3. **Create your first community** via API
4. **Set up Row Level Security** in Supabase
5. **Configure production settings** for deployment

Your NestJS application is now ready to connect to Supabase! 🎉
