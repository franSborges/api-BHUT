import dotenv from 'dotenv';
dotenv.config();

import amqp from 'amqplib';
import axios from 'axios';

const queue = `${process.env.QUEUE_NAME}`;
const rabbitMq = `${process.env.RABBITMQ_URL}`;

async function consumeFromQueue() {
  try {
    const connection = await amqp.connect(rabbitMq);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    console.log('Aguardando mensagens da fila...');

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const carData = JSON.parse(msg.content.toString());
        console.log('Novo carro recebido:', carData);

        axios.post(`${process.env.WEBHOOK_URL}`, carData).then(() => {
          console.log('Webhook enviado com sucesso!');
          channel.ack(msg);
        }).catch((error) => {
          console.error('Error sending webhook:', error.message);
          channel.reject(msg, false);
        });
      }
    });
  } catch (error) {
    console.error('Error consuming queue:', error);
  }
}

consumeFromQueue();
