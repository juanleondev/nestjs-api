import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // Disabled to prevent schema conflicts
  logging: process.env.NODE_ENV === 'development',
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: false,
  // Supabase specific configuration
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  extra: {
    // Connection pool configuration for Supabase
    max: parseInt(process.env.DB_POOL_SIZE, 10) || 10,
    idleTimeoutMillis: parseInt(process.env.DB_POOL_TIMEOUT, 10) || 30000,
    connectionTimeoutMillis: 2000,
  },
});
