import express, { Request, Response} from 'express';
import cors from 'cors';
import { responseEnhancer } from 'express-response-formatter';
import logger from 'morgan';
import * as dotenv from 'dotenv';
import fetch from "cross-fetch";
import { port } from './const/const';
import { url } from './const/const';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(responseEnhancer());
app.use(cors());
app.use(logger("dev"));
dotenv.config();

app.get('/', (req: Request, res: Response) => {
  return res.formatter.ok("Welcome to Alanis - Backend")
});

app.get('/api/search/:term', (req: Request, res: Response) => {
  const { term } = req.params;

  fetch(`${url}${term}`)
    .then( response => response.json())
    .then( data => {
      return res.formatter.ok(data);
    })
    .catch(error => {
      return res.formatter.badRequest(error);
      
    });
});

app.listen(port, () => {
  return console.log(`Express is listening at PORT:${port}`);
});