import pkg from 'pg';

const { Pool } = pkg;

const PG_URI = 'postgres://rcyzjqws:IEUO4MNW9jXWJe8qgdNEZEJ8h_3yz_rB@rajje.db.elephantsql.com/rcyzjqws';
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

const db =  {
  query: (text: string, params?:string[], callback?: any): any => {
    return pool.query(text, params, callback);
  },
};

export default db;
