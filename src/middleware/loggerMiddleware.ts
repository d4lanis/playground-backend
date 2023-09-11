import {Request, Response, NextFunction } from 'express';
import logger from '../logger/logger';

const loggerMiddlweware = (req: Request, res: Response, next: NextFunction) => {  
    const requestStart = Date.now();
    let errorMessage: string;


    req.on("error", error => {
      errorMessage = error.message;
    });

    res.on("finish", () => {
      const { httpVersion, method, url, query, params, body } = req;
      let logLevel = 'info';

    if (res.statusCode >= 500) {
      logLevel = 'error';
    } else if (res.statusCode >= 400) {
      logLevel = 'warn';
    }

      logger.log({
        level: logLevel,
        message: `httpVersion: ${httpVersion} method: ${method}, URL: ${url}, statusCode: ${res.statusCode} body: ${JSON.stringify(body)} error:${res.errored}  processingTime: ${Date.now() - requestStart} query: ${JSON.stringify(query)}, params: ${JSON.stringify(params)}`,
        meta: {
          requestHeaders: req.headers,
          responseHeaders: res.getHeaders()
        }

      })
    });
    
    next();
}

export default loggerMiddlweware;