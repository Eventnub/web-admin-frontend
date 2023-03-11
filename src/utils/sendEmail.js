import axios from './axios';
import { APPOINTMENT_EMAIL_ENDPOINT } from '../constants';

export async function sendAppointmentEmail(
  date,
  time,
  patientName,
  doctorName,
  meetingId,
  meetingPasscode,
  patientEmail,
  doctorEmail
) {
  const data = {
    date,
    time,
    patientName,
    doctorName,
    meetingId,
    meetingPasscode,
    patientEmail,
    doctorEmail
  };

  try {
    await axios.post(APPOINTMENT_EMAIL_ENDPOINT, data);
    return true;
  } catch (error) {
    return false;
  }
}
