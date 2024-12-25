import express from 'express';
import {PORT} from "./config";
import {logger} from "./common/logging/logger.service";
import {authRouter} from "./controllers/auth.controller";
import {createSequelize} from "./dataAccess/sequelizeFactory";
import {UserRepository} from "./dataAccess/repositories/user.repository";

const app = express();
const sequelize = createSequelize();

app.use('/auth', authRouter);

process
    .on('unhandledRejection', (reason) => {
        logger.error(`Unhandled Rejection at Promise, reason: ${reason}`);
    })
    .on('uncaughtException', async (err) => {
        logger.error('Uncaught exception', err);
        await sequelize.close();
        process.exit(1);
    });

const startApp = async () => {
    await sequelize.authenticate();
    app.listen(PORT, () => { logger.info(`Server is running on port ${PORT}`); });
};

startApp();