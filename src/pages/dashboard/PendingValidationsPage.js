import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/dashboard/SearchBar';
import UserProfile from '../../components/dashboard/UserProfile';
import PageTitle from '../../components/dashboard/PageTitle';
import PendingAudios from '../../components/dashboard/audioValidation/PendingAudios';

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

const StyledLink = styled(Link)({
  textDecoration: 'none',
});
export default function AudioValidationPage() {
  return (
    <Box sx={{ bgcolor: '#F4FAFB', height: '100%', width: '100%', pt: 3, pl: 1, pr: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <PageTitle title="Pending Validations" />
        <UserProfile />
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', mt: 5 }}>
        <StyledBox component={StyledLink} to="/dashboard/audio-validation">
          <Number>10,000</Number>
          <Text>Audios Validated</Text>
        </StyledBox>
        <StyledBox component={StyledLink} to="/dashboard/pending-validations">
          <Number>5,000</Number>
          <Text>Audios Pending</Text>
        </StyledBox>
        <StyledBox>
          <Number>1,000</Number>
          <Text>Pending Validators</Text>
        </StyledBox>
        <StyledBox>
          <Number>10</Number>
          <Text>Validator Applications</Text>
        </StyledBox>
      </Box>
      <Box sx={{ mt: 5 }}>
        <SearchBar />
      </Box>
      <PendingAudios />
    </Box>
  );
}
