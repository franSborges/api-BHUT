import mongoose, { Document, Schema } from 'mongoose';

export interface ICar extends Document {
  title: string;
  brand: string;
  price: string;
  age: number;
}

const carSchema = new Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: String, required: true },
  age: { type: Number, required: true },
});

const CarModel = mongoose.model<ICar>('Car', carSchema);

export default CarModel;
