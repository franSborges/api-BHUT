import mongoose from 'mongoose';

const MONGO_URI = `${process.env.DB_MONGO_URL}`;

async function connection() {
 try {
    await mongoose.connect(MONGO_URI);
    console.log('Connection to MongoDB Atlas established!');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }

}

export default {
  connection
}



