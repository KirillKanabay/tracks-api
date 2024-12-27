import {UserClaims} from "../models/userClaims.model";
import {Request} from "express";

declare module "express" {
    export interface Request {
        user?: UserClaims
    }
}

export type BodiedRequest<TRequest, TParams = any> = Request<TParams, {}, TRequest>;