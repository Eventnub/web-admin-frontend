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
  createMusicMatch: (data, idToken) =>
    axios.post(endpoints.createMusicMatch, data, getMultipartHeaderWithAuthToken(idToken)),
  getEventMusicMatch: (eventId, idToken) =>
    axios.get(`${endpoints.getEventMusicMatch}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  deleteMusicMatch: (musicMatchId, idToken) =>
    axios.delete(`${endpoints.deleteMusicMatch}/${musicMatchId}`, getJsonHeaderWithAuthToken(idToken)),
  getValidatedMusicMatchSubmissions: (idToken) =>
    axios.get(endpoints.getValidatedMusicMatchSubmissions, getJsonHeaderWithAuthToken(idToken)),
  getUnvalidatedMusicMatchSubmissions: (idToken) =>
    axios.get(endpoints.getUnvalidatedMusicMatchSubmissions, getJsonHeaderWithAuthToken(idToken)),
  submitMusicMatchVAlidation: (data, idToken) =>
    axios.post(endpoints.submitMusicMatchVAlidation, data, getJsonHeaderWithAuthToken(idToken)),
  getEventQuizResults: (eventId, idToken) =>
    axios.get(`${endpoints.getEventQuizResults}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  getEventRaffleDrawResults: (eventId, idToken) =>
    axios.get(`${endpoints.getEventRaffleDrawResults}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  getEventMusicMatchResults: (eventId, idToken) =>
    axios.get(`${endpoints.getEventMusicMatchResults}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  getEventRaffleDraw: (eventId, idToken) =>
    axios.get(`${endpoints.getEventRaffleDraw}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  getSeatGeekEvent: (eventId, idToken) =>
    axios.get(`${endpoints.getSeatGeekEvent}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  getQuizAndMusicUnisonWinners: (eventId, idToken) =>
    axios.get(`${endpoints.getQuizAndMusicUnisonWinners}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  getEventRaffleDrawWinners: (eventId, idToken) =>
    axios.get(`${endpoints.getEventRaffleDrawWinners}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  getBasicStatistics: () => axios.get(`${endpoints.getBasicStatistics}`, jsonHeader),
};
