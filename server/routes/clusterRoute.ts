import express, { Request, Response } from 'express';
import clusterController from '../controllers/clusterController.ts';
const clusterRoute = express.Router();

//retrieve node and pod info and send it to front end for rendering
clusterRoute.get('/', clusterController.getPodAndNodeInfo, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.nodeAndPodInfo);
});

export default clusterRoute;
