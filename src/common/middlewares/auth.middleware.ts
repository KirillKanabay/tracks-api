import { expressjwt } from "express-jwt";
import {ACCESS_TOKEN_SECRET} from "../../config";

export const authMiddleware = (ignoreExpiration: boolean, except?: string[]) =>{
    if(!ACCESS_TOKEN_SECRET){
        throw new Error("Token secret key is not defined!");
    }

    return expressjwt({
        algorithms: ['HS256'],
        secret: ACCESS_TOKEN_SECRET,
        ignoreExpiration,
        requestProperty: 'user'
    }).unless({path: except});
}