import axios from 'axios';
import { endpoints } from './endpoints';

const jsonHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const requests = {
  login: (data) => axios.post(endpoints.login, data, jsonHeader),
};
