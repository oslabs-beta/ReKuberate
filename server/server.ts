import express, { Request, Response, NextFunction } from 'express';
const app = express();
import pkg from 'pg';
const { Pool } = pkg;
import { fileURLToPath } from 'url';
import path from 'path';
// import initRoute from './routes/initRoute';
// import userRoute from './routes/userRoute';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT: number = 3000;

app.use(express.json());

const PG_URI = 'postgres://rcyzjqws:IEUO4MNW9jXWJe8qgdNEZEJ8h_3yz_rB@rajje.db.elephantsql.com/rcyzjqws';
const pool = new Pool({
  connectionString: PG_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

//Connect to SQL database
pool.connect((err) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  } else {
    console.log('connected');
  }
});

//Serves front end index html when rendering
app.use(express.static(path.join(__dirname, './frontend/index.html')));

//Route to initialize prometheus and grafana
// app.use('/init', initRoute);
//Route for user verification and creation
// app.use('/user', userRoute)

//Catch all Route
app.use('*', (req: Request, res: Response) => res.sendStatus(404));

//Declare ErrorHandler type and assign log to string, status to number, and message to string
type ErrorHandler = {
  log: string;
  status: number;
  message: {
    err: string;
  };
};

//Global Error Handler
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const defaultError: ErrorHandler = {
    log: 'Express error handler caught unkown middleware error',
    status: 400,
    message: { err: 'An error has occured' },
  };
  const errorObj: ErrorHandler = Object.assign(defaultError, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
