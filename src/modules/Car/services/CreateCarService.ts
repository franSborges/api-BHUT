import dotenv from 'dotenv';
dotenv.config();

import axios from "axios";
import carModel from "../models/carModel";
import logModel from "../../Log/models/logModel";
import amqp from 'amqplib';

const rabbitMq = `${process.env.RABBITMQ_URL}`;

interface IRequest {
  _id: string;
  title: string;
  brand: string;
  price: string;
  age: number;
}

async function create(title: string, brand: string, price: string, age: number): Promise<IRequest> {

  const newCarData = {
    title: title,
    brand: brand,
    price: price,
    age: age,
  };

  const createdCar = await carModel.create(newCarData);

   await axios.post(`${process.env.API_BASE_URL}/api/cars`, newCarData);

  const connection = await amqp.connect(rabbitMq);
  const channel = await connection.createChannel();
  const queueName = `${process.env.QUEUE_NAME}`;
  await channel.assertQueue(queueName, { durable: true });
  const carDataString = JSON.stringify(newCarData);
  channel.sendToQueue(queueName, Buffer.from(carDataString), { persistent: true });


  const logData = {
    data_hora: new Date(),
    car_id: createdCar._id,
  };

   await logModel.create(logData);

   return createdCar;
}

export default {
  create
}

