import express, { Express } from 'express';
import { DataSource } from 'typeorm';
import { Task } from './src/tasks/tasks.entity';
import cors from 'cors';
import dotenv from 'dotenv';
import { tasksRouter } from './src/tasks/tasks.router';

// instantiate express app
const app: Express = express();
dotenv.config();

// parse request body
app.use(express.json());
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
  entities: [Task],
  synchronize: true,
});

// define server port
const port = process.env.PORT;

// Initialize with data source
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

// On default route, add taskRouter
app.use('/', tasksRouter);
