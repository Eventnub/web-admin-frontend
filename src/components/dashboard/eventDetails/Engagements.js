import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { requests } from '../../../api/requests';
import useFirebase from '../../../hooks/useFirebase';

const StyledLink = styled(Link)({
  textDecoration: 'none',
});

export default function Engagements({ eventId }) {
  const [raffleDrawStatistics, setRaffleDrawStatistics] = useState({});
  const [quizStatistics, setQuizStatistics] = useState({});
  const { user } = useFirebase();
  const { totalTakes, totalPasses, totalFailures } = raffleDrawStatistics;
  const formattedTotalTakes = totalTakes < 10 ? `0${totalTakes}` : totalTakes;
  const formattedTotalPasses = totalPasses < 10 ? `0${totalPasses}` : totalPasses;
  const formattedTotalFailures = totalPasses < 10 ? `0${totalFailures}` : totalFailures;
  const totalQuizTakes = quizStatistics.totalTakes;
  const totalQuizPasses = quizStatistics.totalPasses;
  const totalQuizFailures = quizStatistics.totalFailures;
  const formattedTotalQuizTakes = totalQuizTakes < 10 ? `0${totalQuizTakes}` : totalQuizTakes;
  const formattedTotalQuizPasses = totalQuizPasses < 10 ? `0${totalQuizPasses}` : totalQuizPasses;
  const formattedTotalQuizFailures = totalQuizFailures < 10 ? `0${totalQuizFailures}` : totalQuizFailures;

  useEffect(() => {
    async function getEventRaffleDrawResults() {
      try {
        const { data } = await requests.getEventRaffleDrawResults(eventId, user.idToken);
        setRaffleDrawStatistics(data.statistics);
      } catch (error) {
        console.log(error);
      }
    }
    getEventRaffleDrawResults();
  }, [user.idToken, eventId]);

  useEffect(() => {
    async function getEventQuizResults() {
      try {
        const { data } = await requests.getEventQuizResults(eventId, user.idToken);
        setQuizStatistics(data.statistics);
      } catch (error) {
        console.log(error);
      }
    }
    getEventQuizResults();
  }, [user.idToken, eventId]);

  return (
    <Box sx={{ mt: '3rem', p: { xs: 0, md: '1rem' }, bgcolor: '#fff', borderRadius: '10px' }}>
      <Typography sx={{ color: '#000', fontWeight: '700', fontSize: '1.6rem' }}>Engagements</Typography>
      <Box
        sx={{
          display: 'flex',
          mt: '2rem',
          gap: { xs: '3rem', md: '8rem' },
          width: { xs: '100%', md: '100%' },
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: 'space-between',
        }}
      >
        <Stack>
          <Typography sx={{ color: '#515151', fontWeight: '600' }}>Total Views</Typography>
          <Typography sx={{ color: '#000', fontWeight: '700' }}>15,456</Typography>
        </Stack>
        <Stack>
          <Typography sx={{ color: '#515151', fontWeight: '600' }}>Total tickets sold</Typography>
          <Typography sx={{ color: '#000', fontWeight: '700' }}>145</Typography>
        </Stack>
        <Stack>
          <Typography sx={{ color: '#515151', fontWeight: '600' }}>Total tickets won</Typography>
          <Typography sx={{ color: '#000', fontWeight: '700' }}>50</Typography>
        </Stack>
      </Box>
      <Box sx={{ mt: '2rem' }}>
        <Typography sx={{ color: '#000', fontWeight: '700', fontSize: '1.3rem' }}>Game activities</Typography>
        <TableContainer sx={{ mt: '2rem' }}>
          <Table>
            <TableHead sx={{ background: '#F5F5F5' }}>
              <TableRow>
                <TableCell>Game</TableCell>
                <TableCell>Won</TableCell>
                <TableCell>Lost</TableCell>
                <TableCell>Total Play</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <StyledLink to={`/dashboard/raffle-draw-results/${eventId}`}>
                  <TableCell>Raffle Draw</TableCell>
                </StyledLink>
                <TableCell>{formattedTotalPasses}</TableCell>
                <TableCell>{formattedTotalFailures}</TableCell>
                <TableCell>{formattedTotalTakes}</TableCell>
              </TableRow>
              <TableRow>
                <StyledLink to={`/dashboard/quiz-results/${eventId}`}>
                  <TableCell>Quiz</TableCell>
                </StyledLink>
                <TableCell>{formattedTotalQuizPasses}</TableCell>
                <TableCell>{formattedTotalQuizFailures}</TableCell>
                <TableCell>{formattedTotalQuizTakes}</TableCell>
              </TableRow>
              <TableRow>
                <StyledLink to={`/dashboard/music-match-results/${eventId}`}>
                  <TableCell>Music Match</TableCell>
                </StyledLink>
                <TableCell>00</TableCell>
                <TableCell>00</TableCell>
                <TableCell>00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

Engagements.propTypes = {
  eventId: PropTypes.string,
};
