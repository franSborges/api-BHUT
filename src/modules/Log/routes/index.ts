import { Router } from 'express';
import logController from '../controllers/LogController';

const logRouter = Router();

logRouter.get('/api/logs', logController.getAllLogCars);


export default logRouter;
