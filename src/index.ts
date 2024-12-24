import express from 'express';
import {PORT} from "./config";
import {logger} from "./common/logging/logger.service";
import {authRouter} from "./controllers/auth.controller";

process
    .on('unhandledRejection', (reason) => {
        logger.error(`Unhandled Rejection at Promise, reason: ${reason}`);
    })
    .on('uncaughtException', (err) => {
        logger.error('Uncaught exception', err);
        process.exit(1);
    });

const app = express();

app.use('/auth', authRouter);

const startApp = async () => {
    app.listen(PORT, () => { logger.info(`Server is running on port ${PORT}`); });
};

startApp();