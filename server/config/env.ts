import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'any-text';

export const JWT_EXPIRES_IN = '1h';

export const REFRESH_TOKEN_EXPIRED_IN='7d';

export const MONGO_URL =process.env.Mongo_URI || 'mongo_URL';

export const PORT=process.env.PORT || 3000;