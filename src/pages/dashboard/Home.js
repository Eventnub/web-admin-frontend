import React, { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import SearchBar from '../../components/dashboard/SearchBar';
import UserProfile from '../../components/dashboard/UserProfile';
import PageTitle from '../../components/dashboard/PageTitle';
import Filter from '../../components/dashboard/Filter';
import Events from '../../components/dashboard/Events';
import { requests } from '../../api/requests';

const StyledBox = styled(Box)({
  flex: 1,
  background: '#EDF5F6',
  borderRadius: '10px',
  padding: '.8rem 1rem',
  height: '100%',
});

const Number = styled(Typography)({
  color: '#000',
  fontWeight: '700',
  fontSize: '1.7rem',
});

const Text = styled(Typography)({
  color: '#878787',
  fontWeight: '400',
  fontSize: '.9rem',
});

export default function Home() {
  const [events, setEvents] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const [events, statistics] = await Promise.all([requests.getEvents(), requests.getBasicStatistics()]);
        setEvents(events.data);
        setStatistics(statistics.data);
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
      <Box sx={{ mt: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <PageTitle title="Explore" />
        <Filter />
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', mt: 5 }}>
        <StyledBox>
          <Number>{statistics?.eventsCount || '00'}</Number>
          <Text>Total events</Text>
        </StyledBox>
        <StyledBox>
          <Number>00</Number>
          <Text>For 100 tickets sold</Text>
        </StyledBox>
        <StyledBox>
          <Number>00</Number>
          <Text>Impressions</Text>
        </StyledBox>
        <StyledBox>
          <Number>{statistics?.usersCount || '00'}</Number>
          <Text>Total fans</Text>
        </StyledBox>
      </Box>
      <Box sx={{ bgcolor: '#fff', mt: 5, p: '1rem' }}>
        <Events events={events} isLoading={isLoading} title="Recently Created " />
      </Box>
    </Box>
  );
}
