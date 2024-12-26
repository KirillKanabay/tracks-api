import express from 'express';
import {PORT} from "./config";
import {logger} from "./common/services/logger.service";
import {authRouter} from "./auth/controllers/auth.controller";
import {createSequelize} from "./dataAccess/sequelizeFactory";
import {errorHandlingMiddleware} from "./common/middlewares/errorHandling.middleware";
import {authMiddleware} from "./common/middlewares/auth.middleware";

const app = express();
const sequelize = createSequelize();

app.use(express.json());
app.use(authMiddleware(false, [ '/auth/login', '/auth/refresh', '/auth/signup' ]));
app.use('/auth', authRouter);

app.use(errorHandlingMiddleware);

const startApp = async () => {
    await sequelize.authenticate();
    app.listen(PORT, () => { logger.info(`Server is running on port ${PORT}`); });
};

process
    .on('unhandledRejection', (reason) => {
        logger.error(`Unhandled Rejection at Promise, reason: ${reason}`);
    })
    .on('uncaughtException', async (err) => {
        logger.error('Uncaught exception', err);
        await sequelize.close();
        process.exit(1);
    });

startApp();