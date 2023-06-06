import express, { Request, Response, NextFunction } from 'express';
import pkg from 'pg';
import { fileURLToPath } from 'url';
import path from 'path';
import { ErrorHandler } from './types';
import initRoute from './routes/initRoute.ts';
import clusterRoute from './routes/clusterRoute.ts';
// import userRoute from './routes/userRoute';

const { Pool } = pkg;
const app = express();

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const PORT: number = 3001;

app.use(express.json());

const PG_URI: string =
  'postgres://rcyzjqws:IEUO4MNW9jXWJe8qgdNEZEJ8h_3yz_rB@rajje.db.elephantsql.com/rcyzjqws';
const pool: pkg.Pool = new Pool({
  connectionString: PG_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

//Connect to SQL database
pool.connect((err: Error) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  } else {
    console.log('connected');
  }
});


// app.use(express.static(path.join(__dirname, './frontend/index.html')), initRoute);
//Serves front end static files
app.use(express.static('./frontend'))

app.use('/', initRoute, (req: Request, res: Response) => {
  return res.status(200).sendFile(path.resolve(__dirname, './frontend/index.html'))
})

//Route to get cluster info when accessing pods display page
app.use('/pods', clusterRoute)
//Route for user verification and creation
// app.use('/user', userRoute)

//Catch all Route
app.use('*', (req: Request, res: Response) => res.sendStatus(404));

//Global Error Handler
app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    const defaultError: ErrorHandler = {
      log: 'Express error handler caught unkown middleware error',
      status: 400,
      message: { err: 'An error has occured' },
    };
    const errorObj: ErrorHandler = Object.assign(defaultError, err);
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
