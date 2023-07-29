import mongoose, { Document, Schema } from 'mongoose';

export interface ILog extends Document {
  data_hora: Date;
  car_id: string;
}

const logSchema = new Schema({
  data_hora: { type: Date, required: true },
  car_id: { type: String, required: true },
});

const Log  = mongoose.model<ILog>('Log', logSchema);

export default Log;

