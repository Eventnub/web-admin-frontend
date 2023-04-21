import React from 'react';
import { Box } from '@mui/material';
import UserProfile from '../../components/dashboard/UserProfile';
import PageTitle from '../../components/dashboard/PageTitle';
import CreateEventForm from '../../sections/event/CreateEventForm';

export default function CreateEvent() {
  return (
    <Box sx={{ pt: 3, pl: 1, pr: 2, bgcolor: '#F4FAFB', height: '100%', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <PageTitle title="New Event" />
        <UserProfile />
      </Box>
      <Box sx={{ mt: '3rem' }}>
        <CreateEventForm />
      </Box>
      <Box sx={{ mt: '2rem' }} />
    </Box>
  );
}
