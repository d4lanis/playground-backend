import express from 'express';
import cors from 'cors';
import { responseEnhancer } from 'express-response-formatter';
import logger from 'morgan';
import * as dotenv from 'dotenv';
import * as Sentry from "@sentry/node";
import loggerMiddlweware from './middleware/loggerMiddleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(responseEnhancer());
app.use(cors());
app.use(logger("dev"));
app.use(loggerMiddlweware);
dotenv.config();

app.get('/', (req, res) => {
  res.formatter.ok("Welcome to Backend Playground")
});

app.listen(process.env.PORT, () => {
  return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});