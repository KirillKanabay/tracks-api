import dotenv from 'dotenv'

dotenv.config();

export const LOG_LEVEL: string = process.env.LOG_LEVEL ?? 'info';
export const LOG_MAX_FILE_SIZE: string = process.env.LOG_MAX_FILE_SIZE ?? '1m';

export const PORT: number = process.env.PORT
    ? parseInt(process.env.PORT) : 3000;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME ?? '1d';

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME ?? '1d';

export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;