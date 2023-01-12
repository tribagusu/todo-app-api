import express, {
  Express,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';

// instantiate express app
const app: Express = express();
dotenv.config();

// parse request body
app.use(bodyParser.json());

// CORS install
app.use(cors());

// create database connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true,
});

// define server port
const port = process.env.PORT;

// get method
app.get('/', (req: Request, res: Response) => {
  res.send('halo');
});

AppDataSource.initialize()
  .then(() => {
    // listen to the port
    app.listen(port);
    console.log('data source has been initialized');
  })
  .catch((err) => {
    console.error(
      'Error during data source initialization',
      err,
    );
  });
