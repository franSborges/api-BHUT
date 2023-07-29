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
    console.error('Erro ao consultar os registros de log:', error);
    throw new Error('Erro ao consultar os registros de log');
  }

}

export default {
  getAll,
}

