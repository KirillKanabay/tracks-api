import dotenv from 'dotenv'

dotenv.config();

export const LOG_LEVEL: string = process.env.LOG_LEVEL ?? 'info';
export const LOG_MAX_FILE_SIZE: string = process.env.LOG_MAX_FILE_SIZE ?? '1m';

export const PORT: number = process.env.PORT
    ? parseInt(process.env.PORT) : 3000;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;