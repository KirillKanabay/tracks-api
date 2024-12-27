import {PORT} from "./config";
import {logger} from "./common/services/logger.service";
import {createSequelize} from "./dataAccess/sequelizeFactory";
import {Application} from "./application";

const app = new Application();
const sequelize = createSequelize();

app.useExceptionHandling(
    (reason) => {
        logger.error(`Unhandled Rejection at Promise, reason: ${reason}`);
    },
    async (error) => {
        logger.error('Uncaught exception', error);
        await sequelize.close();
        process.exit(1);
    })

const startApp = async () => {
    await sequelize.authenticate();
    app.listen(PORT);
};

startApp();