import { Request, Response, NextFunction } from 'express';

export type middleware = (req: Request, res: Response, next: NextFunction) => void;

//Declare controller types
export type InitControllerType = {
  installPrometheus: middleware;
  installGrafana: middleware;
};

export type ClusterControllerType = {
  getPodInfo: middleware;
  getNodeInfo: middleware;
};

//Declare ErrorHandler type and assign log to string, status to number, and message to string
export type ErrorHandler = {
  log: string;
  status: number;
  message: {
    err: string;
  };
};

//Pod info type
export type AllPodsType = {
  [name: string]: PodInfoType;
};

export type PodInfoType = {
  status: string;
  restarts: number;
  mostRecentRestart: number;
  age: number;
};
