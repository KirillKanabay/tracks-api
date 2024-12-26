import {ErrorCodes} from "../constants/errorCodes";

abstract class ExecutionResultBase{
    protected constructor(
        public readonly success: boolean,
        public readonly errorCode?: string,
        public readonly errorMessage?: string
    ) {
    }
}

export class ExecutionResult<TResult> extends ExecutionResultBase{
    public constructor(
        success: boolean,
        errorCode?: string,
        errorMessage?: string,
        private readonly _data?: TResult
    ){
        super(success, errorCode, errorMessage);
    }

    public get isNotFound(): boolean{
        return this.errorCode === ErrorCodes.NOT_FOUND;
    }

    public get data(): TResult{
        if(!this.success){
            throw new Error('Data is not available for failed result');
        }

        return this._data!;
    }

    public static success<TResult>(data?: TResult): ExecutionResult<TResult>{
        return new ExecutionResult<TResult>(true, undefined, undefined, data);
    }

    public static fail<TResult>(errorMessage: string, errorCode?: string): ExecutionResult<TResult>{
        return new ExecutionResult<TResult>(false, errorCode ?? ErrorCodes.GENERAL, errorMessage);
    }

    public static notFound<TResult>(errorMessage?: string): ExecutionResult<TResult>{
        return new ExecutionResult<TResult>(false, ErrorCodes.NOT_FOUND, errorMessage ?? 'Not found');
    }
}