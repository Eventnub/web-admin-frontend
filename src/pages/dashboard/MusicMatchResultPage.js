import React, { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import PreviousButton from '../../components/dashboard/PreviousButton';
import UserProfile from '../../components/dashboard/UserProfile';
import play from '../../assets/play.png';
import MusicMatchTable from '../../components/dashboard/manageGames/MusicMatchTable';
import useFirebase from '../../hooks/useFirebase';
import { requests } from '../../api/requests';

const StyledBox = styled(Box)({
  background: '#EDF5F6',
  borderRadius: '10px',
  padding: '.8rem 1rem',
  height: '100%',
  width: '18%',
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

export default function MusicMatchResultPage() {
  const [event, setEvent] = useState({});
  const [musicMatchResults, setMusicMatchResults] = useState([]);
  const [musicMatchStatistics, setMusicMatchStatistics] = useState({});
  const { totalPasses, totalFailures, totalTakes } = musicMatchStatistics;
  const formattedTotalTakes = totalTakes < 10 ? `0${totalTakes}` : totalTakes;
  const formattedTotalPasses = totalPasses < 10 ? `0${totalPasses}` : totalPasses;
  const formattedTotalFailures = totalPasses < 10 ? `0${totalFailures}` : totalFailures;
  const { eventId } = useParams();
  const { user } = useFirebase();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const { data } = await requests.getEvent(eventId);
        setEvent(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    async function getEventQuizResults() {
      try {
        const { data } = await requests.getEventMusicMatchResults(eventId, user.idToken);
        setMusicMatchResults(data.results);
        setMusicMatchStatistics(data.statistics);
      } catch (error) {
        console.log(error);
      }
    }
    getEventQuizResults();
  }, [user.idToken, eventId]);

  return (
    <Box sx={{ bgcolor: '#F4FAFB', height: '100%', width: '100%', pt: 3, pl: 1, pr: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <PreviousButton />
        <UserProfile />
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography sx={{ textTransform: 'capitalize', color: '#909090', fontWeight: '400', fontSize: '1rem' }}>
            {event.name}
          </Typography>
          <Typography sx={{ color: '#000', fontWeight: 500, fontSize: '2.2rem' }}>Music Match</Typography>
        </Box>
        <Box sx={{ width: '20%' }}>
          <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '.8rem' }}>Set Beat</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ color: '#000', fontWeight: '700', fontSize: '1.2rem' }}>Away by Davido</Typography>
            <img src={play} alt="play" />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
        <StyledBox>
          <Number>{formattedTotalTakes}</Number>
          <Text>Total Recordings</Text>
        </StyledBox>
        <StyledBox>
          <Number>{formattedTotalPasses}</Number>
          <Text>Correct Recordings</Text>
        </StyledBox>
        <StyledBox>
          <Number>{formattedTotalFailures}</Number>
          <Text>Failed Recordings</Text>
        </StyledBox>
      </Box>
      <MusicMatchTable musicMatchResults={musicMatchResults} />
    </Box>
  );
}
