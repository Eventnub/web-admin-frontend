const BASE_URL = 'https://globeventnub.herokuapp.com/api';

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
  createMusicMatch: getFullUrl('music-unison'),
  getEventMusicMatch: getFullUrl('music-unison/get-event-music-unisons'),
  deleteMusicMatch: getFullUrl('music-unison'),
  pendingValidations: getFullUrl('music-unison/get-unreviewed-music-unison-submissions/all'),
  submitMusicMatchVAlidation: getFullUrl('music-unison/review-user-music-submission'),
  getEventQuizResults: getFullUrl('questions/get-event-quiz-results'),
  getEventRaffleDrawResults: getFullUrl('raffle-draws/get-event-raffle-draw-results'),
  getEventMusicMatchResults: getFullUrl('music-unison/get-event-music-unison-results'),
  getSeatGeekEvent: getFullUrl('seat-geek/get-event'),
  getEventRaffleDraw: getFullUrl('raffle-draws/get-event-raffle-draw'),
};
