import axios from 'axios';
import { endpoints } from './endpoints';

const jsonHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const getMultipartHeaderWithAuthToken = (idToken) => ({
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${idToken}`,
  },
});

export const requests = {
  getEvents: () => axios.get(endpoints.getEvents, jsonHeader),
  getEvent: (uid) => axios.get(`${endpoints.getEvents}/${uid}`, jsonHeader),
  createEvent: (idToken, data) =>
    axios.post(`${endpoints.createEvent}`, data, getMultipartHeaderWithAuthToken(idToken)),
};
