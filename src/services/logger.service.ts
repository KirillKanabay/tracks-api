import {createLogger, format, transports} from "winston";
import {LOG_LEVEL, LOG_MAX_FILE_SIZE} from "../config";
import 'winston-daily-rotate-file';
import path from "node:path";

class LoggerService{
    private readonly _logger;

    constructor() {
        this._logger = this._createLogger();
    }

    public log(level: string, message: string, meta?: any){
        this._logger.log(level, message, meta);
    }

    public info(message: string, meta?: any){
        this._logger.info(message, meta);
    }

    public warn(message: string, meta?: any){
        this._logger.warn(message, meta);
    }

    public error(message: string, meta?: any){
        this._logger.error(message, meta);
    }

    public debug(message: string, meta?: any){
        this._logger.debug(message, meta);
    }

    private _createLogger(){
        return createLogger({
            level: LOG_LEVEL,
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
            transports: [
                new transports.Console(),
                this._createFileTransport('error', 'error'),
                this._createFileTransport('combined')
            ]
        })
    }

    private _createFileTransport(filename: string, minLevel?: string){
        return new transports.DailyRotateFile({
            filename: path.join('logs', `${filename}-%DATE%.log`),
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d',
            level: minLevel ?? 'info',
            maxSize: LOG_MAX_FILE_SIZE
        })
    }
}

export const logger = new LoggerService();