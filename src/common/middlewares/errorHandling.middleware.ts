import {NextFunction, Response, Request} from "express";
import {logger} from "../services/logger.service";
import {ErrorModel} from "../models/error.model";
import {UnauthorizedError} from "express-jwt";

export const errorHandlingMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof SyntaxError) {
        res.status(400).send(new ErrorModel("Can't deserialize request body"));
    } else if (error instanceof UnauthorizedError){
        res.status(401).send(new ErrorModel("Unauthorized"));
    } else {
        logger.error('Error occurred.', error);
        res.status(500).send(new ErrorModel('Internal server error'));
    }

    return next();
}