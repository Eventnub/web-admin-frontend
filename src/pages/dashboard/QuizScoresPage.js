import React, { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import PreviousButton from '../../components/dashboard/PreviousButton';
import UserProfile from '../../components/dashboard/UserProfile';
import ScoresTable from '../../components/dashboard/manageGames/ScoresTable';
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

export default function QuizScoresPage() {
  const { eventId } = useParams();
  const { user } = useFirebase();
  const [quizResults, setQuizResults] = useState([]);
  const [quizStatistics, setQuizStatistics] = useState({});
  const [event, setEvent] = useState({});
  const { totalPasses, totalFailures, totalTakes } = quizStatistics;
  const formattedTotalTakes = totalTakes < 10 ? `0${totalTakes}` : totalTakes;
  const formattedTotalPasses = totalPasses < 10 ? `0${totalPasses}` : totalPasses;
  const formattedTotalFailures = totalPasses < 10 ? `0${totalFailures}` : totalFailures;

  useEffect(() => {
    async function getEventQuizResults() {
      try {
        const { data } = await requests.getEventQuizResults(eventId, user.idToken);
        console.log(data);
        setQuizResults(data.results);
        setQuizStatistics(data.statistics);
      } catch (error) {
        console.log(error);
      }
    }
    getEventQuizResults();
  }, [user.idToken, eventId]);

  useEffect(() => {
    async function fetchEvent() {
      try {
        // setIsLoading(true);
        const { data } = await requests.getEvent(eventId);
        setEvent(data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvent();
  }, [eventId]);

  return (
    <Box sx={{ bgcolor: '#F4FAFB', height: '100vh', width: '100%', pt: 3, pl: 1, pr: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <PreviousButton />
        <UserProfile />
      </Box>
      <Box mt={2}>
        <Typography sx={{ textTransform: 'capitalize', color: '#909090', fontWeight: '400', fontSize: '1rem' }}>
          {event.name}
        </Typography>
        <Typography sx={{ color: '#000', fontWeight: 500, fontSize: '2.2rem' }}>Quiz Scores</Typography>
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
          <StyledBox>
            <Number>{formattedTotalTakes}</Number>
            <Text>Total Quiz Taken</Text>
          </StyledBox>
          <StyledBox>
            <Number>{formattedTotalPasses}</Number>
            <Text>Total Pass</Text>
          </StyledBox>
          <StyledBox>
            <Number>{formattedTotalFailures}</Number>
            <Text>Total Fail </Text>
          </StyledBox>
        </Box>
      </Box>
      <ScoresTable quizResults={quizResults} />
    </Box>
  );
}
