import { Request, Response } from 'express';
import CreateCarService from '../../Car/services/CreateCarService';


const createCar = async (req: Request, res: Response) => {
  try {
    const { title, brand, price, age } = req.body;


    const createdCar = await CreateCarService.create(title, brand, price, age);

    const responseObj = {
      id: createdCar._id,
      title: createdCar.title,
      brand: createdCar.brand,
      price: createdCar.price,
      age: createdCar.age,
    };


    return res.status(201).json(responseObj);

  } catch (error) {
    console.error('Error creating car', error);
    res.status(500).json({ error: 'Error creating car' });
  }
};

export default {
  createCar
}



