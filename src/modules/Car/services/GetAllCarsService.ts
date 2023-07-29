import axios from "axios";


async function getAll() {
  const response = await axios.get(`${process.env.API_BASE_URL}/api/cars`);
  return response;
}

export default {
  getAll
}

