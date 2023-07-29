import Log from "../models/logModel";

interface IRequest {
  car_id: string;
  data_hora: Date;
}

async function getAll(): Promise<IRequest[]> {
  try {
    const logs = await Log.find();
    return logs;
  } catch (error) {
    console.error('Error querying log records:', error);
    throw new Error('Error querying log records');
  }

}

export default {
  getAll,
}

