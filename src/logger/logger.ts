import winston from "winston";
import SentryTransport from "winston-transport-sentry-node";
import * as dotenv from "dotenv";
dotenv.config();


const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({filename: 'app.log'}),
        new SentryTransport({
            sentry: {
                environment:"development",
                dsn: process.env.SENTRY_DSN,
                attachStacktrace: true,
                debug: true
            }
        })
    ],
});


export default logger;