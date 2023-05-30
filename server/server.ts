import express, {Request, Response, NextFunction} from 'express'
const app = express();
import { Pool } from 'pg';
import path from 'path';

const PORT: number = 3000;

const PG_URI = 'postgres://rcyzjqws:vzvsE8cnMcQ8DNEpmuocpc26AO1-ppbC@rajje.db.elephantsql.com/rcyzjqw';
const pool = new Pool({
    connectionString: PG_URI,
    ssl: {
        rejectUnauthorized: false
    }
});

//Connect to SQL database
pool.connect((err) => {
    if (err) {
       return console.error('could not connect to postgres', err)
    } else {
        console.log('connected');
    };
})

//Serves front end index html when rendering
app.use(express.static(path.join(__dirname, './frontend/index.html')))

//Catch all Route
app.use('*', (req: Request, res: Response) => res.sendStatus(404));

//Declare ErrorHandler type and assign log to string, status to number, and message to string
type ErrorHandler = {
    log: string,
    status: number,
    message: {
        err: string;
    };
};

//Global Error Handler
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    const defaultError: ErrorHandler ={
        log: 'Express error handler caught unkown middleware error',
        status: 400,
        message: { err: "An error has occured" },
    };
    const errorObj: ErrorHandler = Object.assign(defaultError, err);
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));