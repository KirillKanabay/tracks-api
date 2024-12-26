import {NextFunction, Response, Request} from "express";
import {logger} from "../services/logger.service";
import {ErrorModel} from "../models/error.model";

export const errorHandlingMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof SyntaxError) {
        res.status(400).send(new ErrorModel("Can't deserialize request body"));
    } else {
        logger.error('Error occurred.', error);
        res.status(500).send(new ErrorModel('Internal server error'));
    }

    return next();
}