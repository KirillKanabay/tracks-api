import {UserClaims} from "./userClaims.model";

declare module "express" {
    export interface Request {
        user?: UserClaims
    }
}