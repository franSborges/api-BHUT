import { Request, Response } from 'express';
import GetAllCarsService from '../../Car/services/GetAllCarsService';


const getAllCars = async (req: Request, res: Response) => {
  try {
   const cars = await GetAllCarsService.getAll();
    return res.status(201).json(cars);
  } catch (error) {
    console.error('Error getting data from external API', error);
    res.status(500).json({ error: 'Error getting data from external API' });
  }
};

export default {
  getAllCars
}
