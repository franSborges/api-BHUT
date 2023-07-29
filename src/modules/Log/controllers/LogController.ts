import { Request, Response } from 'express';
import logService from '../services/GetAllLogCarsService';

const getAllLogCars = async (req: Request, res: Response) => {
  try {
    const logs = await logService.getAll();
    return res.status(200).json(logs);

  } catch (error) {
    console.error('Error querying log records:', error);
    res.status(500).json({ error: 'Error querying log records' });
  }
}

export default {
  getAllLogCars
}
