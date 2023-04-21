import axios from 'axios';
import { endpoints } from './endpoints';

const jsonHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const getJsonHeaderWithAuthToken = (idToken) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${idToken}`,
  },
});

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
  updateEvent: (eventId, data, idToken) =>
    axios.patch(`${endpoints.getEvents}/${eventId}`, data, getMultipartHeaderWithAuthToken(idToken)),
  getUnapprovedEvents: () => axios.get(endpoints.getUnapprovedEvents, jsonHeader),
  getArchivedEvents: () => axios.get(endpoints.getArchivedEvents, jsonHeader),
  addQuestion: (idToken, data) => axios.post(endpoints.addQuestion, data, getJsonHeaderWithAuthToken(idToken)),
  getEventQuestion: (eventId, idToken) =>
    axios.get(`${endpoints.getEventQuestion}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  deleteQuestion: (questionId, idToken) =>
    axios.delete(`${endpoints.deleteQuestion}/${questionId}`, getJsonHeaderWithAuthToken(idToken)),
  createRaffleDraw: (data, idToken) =>
    axios.post(endpoints.createRaffleDraw, data, getJsonHeaderWithAuthToken(idToken)),
};
