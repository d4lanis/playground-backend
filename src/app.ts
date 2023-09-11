import express from 'express';
import cors from 'cors';
import { responseEnhancer } from 'express-response-formatter';
import logger from 'morgan';
import * as dotenv from 'dotenv';
import { port } from './const/const';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(responseEnhancer());
app.use(cors());
app.use(logger("dev"));
dotenv.config();

app.get('/', (req, res) => {
  return res.formatter.ok("Welcome to playground - backend")
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});