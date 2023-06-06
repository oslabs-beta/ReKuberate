import express, { Request, Response, NextFunction } from 'express';
import clusterController from '../controllers/clusterController.ts';
const clusterRoute = express.Router();

clusterRoute.get(
  '/',
  clusterController.getPodAndNodeInfo,
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(res.locals.nodeAndPodInfo);
  }
);

export default clusterRoute