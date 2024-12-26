import {ACCESS_TOKEN_LIFETIME, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_LIFETIME, REFRESH_TOKEN_SECRET} from "../../config";
import * as jwt from "jsonwebtoken";
import {JwtPayload} from "jsonwebtoken";

type TokenType = 'access' | 'refresh';

export const generateToken = (tokenType: TokenType, claims: object): string => {
    const secretKey = tokenType === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
    const lifetime = tokenType === 'access' ? ACCESS_TOKEN_LIFETIME : REFRESH_TOKEN_LIFETIME;

    if(!secretKey){
        throw new Error(`Token secret key is not defined! Token type: ${tokenType}`);
    }

    return jwt.sign(claims, secretKey, {expiresIn: lifetime, algorithm: 'HS256'});
}

export const parseToken = (tokenType: TokenType, token: string) : jwt.JwtPayload | null => {
    const secretKey = tokenType === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

    if(!secretKey){
        throw new Error(`Token secret key is not defined! Token type: ${tokenType}`);
    }

    try {
        return jwt.verify(token, secretKey) as JwtPayload;
    } catch {
        return null;
    }
}