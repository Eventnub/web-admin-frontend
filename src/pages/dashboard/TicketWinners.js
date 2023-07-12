import React, { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import PreviousButton from '../../components/dashboard/PreviousButton';
import UserProfile from '../../components/dashboard/UserProfile';
import WinnersTable from '../../components/dashboard/manageGames/WinnersTable';
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

export default function TicketWinners() {
  const { eventId } = useParams();
  const { user } = useFirebase();
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizAndMusicMatchWinners, setQuizAndMusicMatchWinners] = useState([]);
  const [raffleDrawWinners, setRaffleDrawWinners] = useState([]);

  const fetchEventDetails = async () => {
    try {
      const { data } = await requests.getEvent(eventId);
      setEvent(data.winners);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuizAndMusicMatchWinners = async () => {
    try {
      const { data } = await requests.getQuizAndMusicUnisonWinners(eventId, user.idToken);
      setQuizAndMusicMatchWinners(data.winners);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRaffleDrawWinners = async () => {
    try {
      const { data } = await requests.getEventRaffleDrawWinners(eventId, user.idToken);
      setRaffleDrawWinners(data.winners);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchEventDetails();
      await fetchQuizAndMusicMatchWinners();
      await fetchRaffleDrawWinners();
      setLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.idToken, eventId]);

  return (
    <Box sx={{ bgcolor: '#F4FAFB', height: '100vh', width: '100%', pt: 3, pl: 1, pr: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <PreviousButton />
        <UserProfile />
      </Box>
      <Box mt={2}>
        <Typography
          sx={{
            textTransform: 'capitalize',
            color: '#909090',
            fontWeight: '400',
            fontSize: '1rem',
          }}
        >
          {event?.name}
        </Typography>
        <Typography
          sx={{
            color: '#000',
            fontWeight: 500,
            fontSize: '2.2rem',
          }}
        >
          Ticket Winners
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
          <StyledBox>
            <Number>{quizAndMusicMatchWinners?.length + raffleDrawWinners?.length || 0}</Number>
            <Text>Total</Text>
          </StyledBox>
          <StyledBox>
            <Number>{quizAndMusicMatchWinners?.length || 0}</Number>
            <Text>Quiz & Music Match</Text>
          </StyledBox>
          <StyledBox>
            <Number>{raffleDrawWinners?.length || 0}</Number>
            <Text>Raffle Draw</Text>
          </StyledBox>
        </Box>
      </Box>
      <WinnersTable
        loading={loading}
        quizAndMusicMatchWinners={quizAndMusicMatchWinners}
        raffleDrawWinners={raffleDrawWinners}
      />
    </Box>
  );
}
