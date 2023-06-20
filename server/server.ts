import express, { Request, Response } from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
import { ErrorHandler } from './types';
import initRoute from './routes/initRoute.ts';
import clusterRoute from './routes/clusterRoute.ts';
import userRoute from './routes/userRoute.ts';
import gitController from './controllers/gitController.ts';
const app = express();

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const PORT = 3001;

app.use(express.json());
app.use(cookieParser());

//if build is in production mode, serve the distribution folder
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve(__dirname, '../dist')));
}

//Route for OAuth
app.use('/api/getAccessToken', gitController.getAccessToken, gitController.getUserData, (req, res) => {
  return res.status(200).redirect('/');
});

//Route to install prometheus and grafana
app.use('/api/initiate', initRoute);

//Route to get cluster info when accessing pods display page
app.use('/api/pods', clusterRoute);

//Route for user verification and creation
app.use('/api/user', userRoute);

//Catch all Route
app.use('*', (req: Request, res: Response) => res.status(404).send('this is not the address you\'re looking for'));

//Global Error Handler
app.use((err: ErrorHandler, req: Request, res: Response) => {
  const defaultError: ErrorHandler = {
    log: 'Express error handler caught unkown middleware error',
    status: 500,
    message: { err: 'An error has occured' },
  };
  const errorObj: ErrorHandler = Object.assign(defaultError, err);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
