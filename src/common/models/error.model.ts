import {ValidationErrorModel} from "./validationError.model";
import {ExecutionResult} from "./executionResult.model";
import {ErrorCodes} from "../constants/errorCodes";

export class ErrorModel{
    constructor(public message: string, public errors?: ValidationErrorModel[]){
    }

    public static fromValidationErrors(errors: ValidationErrorModel[]): ErrorModel{
        return new ErrorModel('Validation failed', errors);
    }

    public static fromExecutionResult(result: ExecutionResult<any>): ErrorModel{
        if(result.success){
            throw new Error('Cannot create error model from successful result');
        }

        if(result.isNotFound){
            return new ErrorModel('Not found');
        }

        if(result.errorCode === ErrorCodes.INTERNAL){
            return new ErrorModel('Internal server error');
        }

        return new ErrorModel(result.errorMessage!);
    }
}