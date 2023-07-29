import { Router } from 'express';
import carController from '../../../modules/Car/controllers/CarController';
import logController from '../../../modules/Log/controllers/LogController';

const carRouter = Router();

carRouter.post('/api/createCar', carController.createCar);

carRouter.get('/api/listCars', logController.getAllLogCars);

export default carRouter;
