import { Request, Response, NextFunction } from 'express';

export type middleware = (req: Request, res: Response, next: NextFunction) => void;

//Declare controller types
export type InitControllerType = {
  installPrometheus: middleware;
  installGrafana: middleware;
};

export type ClusterControllerType = {
  getPodAndNodeInfo: middleware;
  // getNodeInfo: middleware
};

//Declare ErrorHandler type and assign log to string, status to number, and message to string
export type ErrorHandler = {
  log: string;
  status: number;
  message: {
    err: string;
  };
};

export type obj = {
  [key: string]: {
    [key: string]: any;
  };
};

// export type podsSplit = string | string[];
