import {Response} from "express";
import {ExecutionResult} from "../models/executionResult.model";
import {ErrorModel} from "../models/error.model";
import {ErrorCodes} from "../constants/errorCodes";

export const responseWithFailedExecutionResult = (response: Response, result: ExecutionResult<any>)=> {
    if(result.success){
        throw new Error('Result is not failed');
    }

    const errorModel = ErrorModel.fromExecutionResult(result);
    let statusCode:number;

    switch (result.errorCode){
        case ErrorCodes.INTERNAL:
            statusCode = 500;
            break;
        case ErrorCodes.NOT_FOUND:
            statusCode = 404;
            break;
        default:
            statusCode = 400;
            break;
    }

    response.status(statusCode).send(errorModel);
}