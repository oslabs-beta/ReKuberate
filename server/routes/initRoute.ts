import express, { NextFunction, Request, Response } from "express";
import initController from "../controllers/initController.ts";

const initRoute = express.Router();

initRoute.get(
  "/",
  initController.installPrometheus,
  initController.installGrafana,
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(res.locals.graphs);
  }
);

export default initRoute;
