import mongoose from 'mongoose';

const MONGO_URI = `${process.env.DB_MONGO_URL}`;

async function connection() {
 try {
    await mongoose.connect(MONGO_URI);
    console.log('Conexão com o MongoDB Atlas estabelecida!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB Atlas:', error);
  }

}

export default {
  connection
}



