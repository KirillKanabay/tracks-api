import {UserClaims} from "./userClaims.model";
import {Request} from "express";

declare module "express" {
    export interface Request {
        user?: UserClaims
    }
}

export type BodiedRequest<T> = Request<{}, {}, T>;