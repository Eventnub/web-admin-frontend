import React, { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/dashboard/SearchBar';
import UserProfile from '../../components/dashboard/UserProfile';
import PageTitle from '../../components/dashboard/PageTitle';
import PendingAudios from '../../components/dashboard/audioValidation/PendingAudios';
import { requests } from '../../api/requests';
import useFirebase from '../../hooks/useFirebase';

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

export default function PendingValidationsPage() {
  const [validatedMusicMatchSubmissions, setValidatedMusicMatchSubmissions] = useState([]);
  const [unvalidatedMusicMatchSubmissions, setUnvalidatedMusicMatchSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useFirebase();

  useEffect(() => {
    async function fetchUnvalidatedMusicMatchSubmissions() {
      setLoading(true);
      try {
        const [validatedSubmissions, unvalidatedSubmissions] = await Promise.all([
          requests.getValidatedMusicMatchSubmissions(user.idToken),
          requests.getUnvalidatedMusicMatchSubmissions(user.idToken),
        ]);
        setValidatedMusicMatchSubmissions(validatedSubmissions.data);
        setUnvalidatedMusicMatchSubmissions(unvalidatedSubmissions.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    fetchUnvalidatedMusicMatchSubmissions();
  }, [user.idToken]);

  return (
    <Box sx={{ bgcolor: '#F4FAFB', height: '100%', width: '100%', pt: 3, pl: 1, pr: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <PageTitle title="Pending Validations" />
        <UserProfile />
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', mt: 5 }}>
        <StyledBox component={StyledLink} to="/dashboard/audio-validation">
          <Number>{validatedMusicMatchSubmissions.length}</Number>
          <Text>Audios Validated</Text>
        </StyledBox>
        <StyledBox component={StyledLink} to="/dashboard/pending-validations">
          <Number>{unvalidatedMusicMatchSubmissions.length}</Number>
          <Text>Audios Pending</Text>
        </StyledBox>
        <StyledBox>
          <Number>0</Number>
          <Text>Pending Validators</Text>
        </StyledBox>
        <StyledBox>
          <Number>0</Number>
          <Text>Validator Applications</Text>
        </StyledBox>
      </Box>
      <Box sx={{ mt: 5 }}>
        <SearchBar />
      </Box>
      <PendingAudios loading={loading} unvalidatedMusicMatchSubmissions={unvalidatedMusicMatchSubmissions} />
    </Box>
  );
}
