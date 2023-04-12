import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import SearchBar from '../../components/dashboard/SearchBar';
import UserProfile from '../../components/dashboard/UserProfile';
import PageTitle from '../../components/dashboard/PageTitle';
import Filter from '../../components/dashboard/Filter';

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
          <Number>03</Number>
          <Text>Total events</Text>
        </StyledBox>
        <StyledBox>
          <Number>$8,000</Number>
          <Text>For 100 tickets sold</Text>
        </StyledBox>
        <StyledBox>
          <Number>10k</Number>
          <Text>Impressions</Text>
        </StyledBox>
        <StyledBox>
          <Number>1.5k</Number>
          <Text>Total fans</Text>
        </StyledBox>
      </Box>
      <Box sx={{ bgcolor: '#fff', mt: 5 }}>f</Box>
    </Box>
  );
}
