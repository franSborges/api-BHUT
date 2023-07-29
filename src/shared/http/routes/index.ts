import dotenv from 'dotenv';
dotenv.config();

import { Router } from 'express';
import connectToMongoDB from '../../database/mongoConfig';
import carRouter from '../../../modules/Car/routes';
import logRouter from '../../../modules/Log/routes';

const routes = Router();

connectToMongoDB.connection();


routes.use(logRouter);
routes.use(carRouter);


export default routes;
