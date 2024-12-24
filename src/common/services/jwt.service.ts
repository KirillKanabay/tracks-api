import * as jwt from 'jsonwebtoken';
import {ACCESS_TOKEN_SECRET} from "../../config";

export class JwtService{
    public static generateToken(claims: object, expiresIn: string | number) :string {
        if(!ACCESS_TOKEN_SECRET){
            throw new Error("Token secret key is not defined!");
        }

        return jwt.sign(claims, ACCESS_TOKEN_SECRET, {expiresIn: expiresIn, algorithm: 'HS256'});
    }
}