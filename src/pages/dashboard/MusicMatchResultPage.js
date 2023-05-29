import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import PreviousButton from '../../components/dashboard/PreviousButton';
import UserProfile from '../../components/dashboard/UserProfile';
import play from '../../assets/play.png';
import MusicMatchTable from '../../components/dashboard/manageGames/MusicMatchTable';

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
          <Number>1,000</Number>
          <Text>Total Recordings</Text>
        </StyledBox>
        <StyledBox>
          <Number>400</Number>
          <Text>Correct Recordings</Text>
        </StyledBox>
        <StyledBox>
          <Number>600</Number>
          <Text>Failed Recordings</Text>
        </StyledBox>
      </Box>
      <MusicMatchTable />
    </Box>
  );
}
