import { Request, Response, NextFunction } from 'express';

export type middleware = (req: Request, res: Response, next: NextFunction) => void;

//Declare controller types
export type InitControllerType = {
  installPrometheus: middleware;
  installGrafana: middleware;
};

export type ClusterControllerType = {
  getPodAndNodeInfo: middleware;
};

export type userControllerType = {
  checkUser: middleware;
  createUser: middleware;
  checkPassword: middleware;
};

export type CookieControllerType = {
  setSSIDCookie: middleware;
};

export type SessionControllerType = {
  hasCookie: middleware;
};

export type gitControllerType = {
  getAccessToken: middleware;
  getUserData: middleware;
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
