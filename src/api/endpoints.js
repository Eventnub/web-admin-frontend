const BASE_URL = 'https://eventnub.onrender.com/api';

const getFullUrl = (endpoint) => `${BASE_URL}/${endpoint}`;

export const endpoints = {
  getEvents: getFullUrl('events'),
  createEvent: getFullUrl('events'),
};
