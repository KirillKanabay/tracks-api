import bcrypt from 'bcrypt';
import * as crypto from "node:crypto";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export const comparePasswords = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}

export const hashSHA256 = (value: string) => {
    return crypto.createHash('sha256').update(value).digest('hex');
}

export const compareSHA256Hash = (value: string, hash: string) => {
    return hashSHA256(value) === hash;
}
