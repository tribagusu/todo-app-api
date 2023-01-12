import { Request, Response, Router } from 'express';
import { TasksController } from './tasks.controller';

// Fire the router function
export const tasksRouter: Router = Router();

// Create a default route
tasksRouter.get('/tasks', (req: Request, res: Response) => {
  const taskController = new TasksController();
  taskController.getAll();
});
