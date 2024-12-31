import express, {Express} from "express";
import {authRouter} from "./auth/auth.controller";
import {userRouter} from "./users/user.controller";
import {authMiddleware} from "./common/middlewares/auth.middleware";
import {errorHandlingMiddleware} from "./common/middlewares/errorHandling.middleware";
import {logger} from "./common/services/logger.service";
import {artistRouter} from "./artists/artist.controller";

export class Application{
    private readonly _express: Express;

    constructor() {
        this._express = express();
        this._configure();
    }

    public listen(port: number){
        this._express.listen(port, () => { logger.info(`Server is running on port ${port}`); });
    }

    private _configure(){
        this._express.use(express.json());
        this._express.use(authMiddleware(false, [ '/auth/login', '/auth/refresh', '/auth/signup' ]));
        this._useRoutes();
        this._express.use(errorHandlingMiddleware);
    }

    private _useRoutes(){
        this._express.use('/auth', authRouter);
        this._express.use('/user', userRouter);
        this._express.use('/artist', artistRouter);
    }

    public useExceptionHandling(unhandledRejectionHandler: (reason: unknown) => void, uncaughtExceptionHandler: (err: Error) => void){
        process
            .on('unhandledRejection', unhandledRejectionHandler)
            .on('uncaughtException', uncaughtExceptionHandler);
    }
}