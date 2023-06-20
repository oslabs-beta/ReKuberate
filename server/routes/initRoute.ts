import express, { NextFunction, Request, Response } from 'express';
import initController from '../controllers/initController.ts';

const initRoute = express.Router();

//route hander that goes through the prometheus, grafana stack middleware to obtain the metrics graphs
initRoute.get('/', initController.installPrometheus, initController.installGrafana, (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(res.locals.graphs);
  }
);

export default initRoute;
