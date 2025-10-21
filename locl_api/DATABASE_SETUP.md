# PostgreSQL Database Setup Guide

This guide explains how to connect your NestJS application to PostgreSQL using TypeORM.

## Prerequisites

1. **PostgreSQL installed** on your system
2. **Node.js** and **npm** installed
3. **Database created** for your application

## Installation

The following packages have been installed:

```bash
npm install @nestjs/typeorm @nestjs/config typeorm pg @types/pg class-validator class-transformer
```

## Configuration

### 1. Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=locl_api

# Application Configuration
NODE_ENV=development
PORT=3000
```

### 2. Database Configuration

The database configuration is centralized in `src/config/database.config.ts`:

```typescript
export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'locl_api',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: false,
});
```

## Database Setup

### 1. Create PostgreSQL Database

Connect to PostgreSQL and create your database:

```sql
CREATE DATABASE locl_api;
```

### 2. Update Environment Variables

Update the `.env` file with your actual database credentials.

### 3. Run the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## Features Implemented

### 1. TypeORM Integration
- PostgreSQL connection configured
- Entity auto-discovery
- Development mode synchronization enabled
- Migration support ready

### 2. Community Entity
- UUID primary key
- Name, description, location fields
- Active status flag
- Automatic timestamps (createdAt, updatedAt)

### 3. CRUD Operations
- Create communities
- Read all communities
- Read single community by ID
- Update community
- Delete community

### 4. Validation
- Input validation using class-validator
- Global validation pipes enabled
- DTO validation for create/update operations

## API Endpoints

- `POST /communities` - Create a new community
- `GET /communities` - Get all communities
- `GET /communities/:id` - Get community by ID
- `PATCH /communities/:id` - Update community
- `DELETE /communities/:id` - Delete community

## Example Usage

### Create Community
```bash
curl -X POST http://localhost:3000/communities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Community",
    "description": "A community for tech enthusiasts",
    "location": "San Francisco",
    "isActive": true
  }'
```

### Get All Communities
```bash
curl http://localhost:3000/communities
```

## Development Notes

- **Synchronize**: Set to `true` in development for automatic schema updates
- **Logging**: Enabled in development for SQL query logging
- **Validation**: Global validation pipes ensure data integrity
- **Error Handling**: Proper HTTP status codes and error messages

## Production Considerations

1. Set `NODE_ENV=production`
2. Disable `synchronize` (use migrations instead)
3. Disable `logging` for performance
4. Use connection pooling for high traffic
5. Set up proper database credentials and security
