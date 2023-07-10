import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import SearchBar from '../../components/dashboard/SearchBar';
import UserProfile from '../../components/dashboard/UserProfile';
import PageTitle from '../../components/dashboard/PageTitle';
import Events from '../../components/dashboard/Events';
import { requests } from '../../api/requests';

export default function ManageGames() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const { data } = await requests.getEvents();
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <Box sx={{ bgcolor: '#F4FAFB', height: '100%', width: '100%', pt: 3, pl: 1, pr: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar />
        <UserProfile />
      </Box>
      <Box sx={{ mt: 5 }}>
        <PageTitle title="Manage Games" />
      </Box>
      <Box sx={{ bgcolor: '#fff', mt: 5, p: '1rem' }}>
        <Events events={events} isLoading={isLoading} title="Events " baseLink="/dashboard/quiz-results" />
      </Box>
    </Box>
  );
}
