import express, { Request, Response, NextFunction } from 'express';
// import pkg from 'pg';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
import { ErrorHandler } from './types';
import initRoute from './routes/initRoute.ts';
import clusterRoute from './routes/clusterRoute.ts';
import userRoute from './routes/userRoute.ts';
import gitController from './controllers/gitController.ts';
// const { Pool } = pkg;
const app = express();

// const __filename: string = fileURLToPath(import.meta.url);
// const __dirname: string = path.dirname(__filename);

const PORT: number = 3001;

app.use(express.json());
app.use(cookieParser());
// const PG_URI: string = 'postgres://rcyzjqws:IEUO4MNW9jXWJe8qgdNEZEJ8h_3yz_rB@rajje.db.elephantsql.com/rcyzjqws';
// const pool: pkg.Pool = new Pool({
//   connectionString: PG_URI,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// //Connect to SQL database
// pool.connect((err: Error) => {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   } else {
//     console.log('connected');
//   }
// });

// const db = {
//   query: (text: string, params?: string[], callback?: any): any => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   },
// };

//Serves front end static files
// app.use(express.static('./frontend'))

// app.use('/', initRoute, (req: Request, res: Response) => {
//   return res.status(200).sendFile(path.resolve(__dirname, './frontend/index.html'))
// })

// if (process.env.NODE_ENV === 'production') {
//   app.use('/', express.static(path.resolve(__dirname, '../dist')));
// }

app.use(express.static('/usr/src/app/dist'));

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
app.use('*', (req: Request, res: Response) => res.status(404).send("this is not the address you're looking for"));

//Global Error Handler
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const defaultError: ErrorHandler = {
    log: 'Express error handler caught unkown middleware error',
    status: 500,
    message: { err: 'An error has occured' },
  };
  const errorObj: ErrorHandler = Object.assign(defaultError, err);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
