import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PreviousButton from '../../components/dashboard/PreviousButton';
import UserProfile from '../../components/dashboard/UserProfile';
import DrawsTable from '../../components/dashboard/manageGames/DrawsTable';
import useFirebase from '../../hooks/useFirebase';
import { requests } from '../../api/requests';

const RaffleNumber = styled(Typography)({
  color: '#000',
  fontWeight: '700',
  fontSize: '.6rem',
  textAlign: 'center',
});

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

export default function RaffleScoresPage() {
  const { eventId } = useParams();
  const { user } = useFirebase();
  const [raffleDrawResults, setRaffleDrawResults] = useState([]);

  useEffect(() => {
    async function getEventRaffleDrawResults() {
      try {
        const { data } = await requests.getEventRaffleDrawResults(eventId, user.idToken);
        setRaffleDrawResults(data);
      } catch (error) {
        console.log(error);
      }
    }
    getEventRaffleDrawResults();
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
            Canadian Festival
          </Typography>
          <Typography sx={{ color: '#000', fontWeight: 500, fontSize: '2.2rem' }}>Raffle Scores</Typography>
        </Box>
        <Box sx={{ width: '20%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '.8rem' }}>Lucky Numbers</Typography>
            <IconButton>
              <VisibilityOffOutlinedIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box
              sx={{
                height: '27px',
                width: '26px',
                bgcolor: '#E3E3E3',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RaffleNumber>12</RaffleNumber>
            </Box>
            <Box
              sx={{
                height: '27px',
                width: '26px',
                bgcolor: '#E3E3E3',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RaffleNumber>14</RaffleNumber>
            </Box>
            <Box
              sx={{
                height: '27px',
                width: '26px',
                bgcolor: '#E3E3E3',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RaffleNumber>20</RaffleNumber>
            </Box>
            <Box
              sx={{
                height: '27px',
                width: '26px',
                bgcolor: '#E3E3E3',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RaffleNumber>30</RaffleNumber>
            </Box>
            <Box
              sx={{
                height: '27px',
                width: '26px',
                bgcolor: '#E3E3E3',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RaffleNumber>40</RaffleNumber>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
        <StyledBox>
          <Number>1,000</Number>
          <Text>Total Draws</Text>
        </StyledBox>
        <StyledBox>
          <Number>400</Number>
          <Text>Correct Draws</Text>
        </StyledBox>
        <StyledBox>
          <Number>600</Number>
          <Text>Failed Draws</Text>
        </StyledBox>
      </Box>
      <DrawsTable raffleDrawResults={raffleDrawResults} />
    </Box>
  );
}
