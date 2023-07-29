import amqp from 'amqplib';
import axios from 'axios';

const QUEUE = `${process.env.QUEUE_NAME}`;

async function consumeFromQueue() {
  try {
    const connection = await amqp.connect(`${process.env.RABBITMQ_URL}`);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    console.log('Aguardando mensagens da fila...');

    channel.consume(QUEUE, (msg) => {
      if (msg !== null) {
        const carData = JSON.parse(msg.content.toString());
        console.log('Novo carro recebido:', carData);

        axios.post(`${process.env.WEBHOOK_URL}`, carData).then(() => {
          console.log('Webhook enviado com sucesso!');
          channel.ack(msg);
        }).catch((error) => {
          console.error('Erro ao enviar webhook:', error.message);
          channel.reject(msg, false);
        });
      }
    });
  } catch (error) {
    console.error('Erro ao consumir fila:', error);
  }
}

consumeFromQueue();
