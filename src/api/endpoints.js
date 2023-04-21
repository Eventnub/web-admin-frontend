const BASE_URL = 'https://eventnub.onrender.com/api';

const getFullUrl = (endpoint) => `${BASE_URL}/${endpoint}`;

export const endpoints = {
  getEvents: getFullUrl('events'),
  getUnapprovedEvents: getFullUrl('events?onlyUnapproved=true'),
  getArchivedEvents: getFullUrl('events?onlyArchived=true'),
  createEvent: getFullUrl('events'),
  addQuestion: getFullUrl('questions'),
  deleteQuestion: getFullUrl('questions'),
  getEventQuestion: getFullUrl('questions/get-event-quiz'),
  createRaffleDraw: getFullUrl('raffle-draws'),
};
