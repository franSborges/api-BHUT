import axios from "axios";
import carModel from "../models/carModel";
import logModel from "../../Log/models/logModel";
import amqp from 'amqplib';
import { utcToZonedTime, format } from 'date-fns-tz';


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

  const connection = await amqp.connect(`${process.env.RABBITMQ_URL}`);
  const channel = await connection.createChannel();
  const queueName = `${process.env.QUEUE_NAME}`;
  await channel.assertQueue(queueName, { durable: true });
  const carDataString = JSON.stringify(newCarData);
  channel.sendToQueue(queueName, Buffer.from(carDataString), { persistent: true });


  const dataHoraUTC = new Date();
  const dataHora = utcToZonedTime(dataHoraUTC, 'America/Sao_Paulo');

  const logData = {
    data_hora: format(dataHora, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", { timeZone: 'America/Sao_Paulo' }),
    car_id: createdCar._id,
  };

   await logModel.create(logData);

   return createdCar;
}

export default {
  create
}

