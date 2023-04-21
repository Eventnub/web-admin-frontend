import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import SearchBar from '../../components/dashboard/SearchBar';
import UserProfile from '../../components/dashboard/UserProfile';
import PageTitle from '../../components/dashboard/PageTitle';
import Filter from '../../components/dashboard/Filter';
import wizkid from '../../assets/wizkid.png';
import kanye from '../../assets/kanye.png';
import psquare from '../../assets/Psquare.png';
import flavour from '../../assets/flavour.png';

const data = [
  {
    id: 1,
    name: 'Kanye',
    photoUrl: kanye,
  },
  {
    id: 2,
    name: 'P-Square',
    photoUrl: psquare,
  },
  {
    id: 3,
    name: 'Star Boy',
    photoUrl: wizkid,
  },
  {
    id: 4,
    name: 'Flavour',
    photoUrl: flavour,
  },
  {
    id: 5,
    name: 'Kanye',
    photoUrl: kanye,
  },
  {
    id: 6,
    name: 'P-Square',
    photoUrl: psquare,
  },
  {
    id: 7,
    name: 'Star Boy',
    photoUrl: wizkid,
  },
  {
    id: 8,
    name: 'Flavour',
    photoUrl: flavour,
  },
  {
    id: 9,
    name: 'Kanye',
    photoUrl: kanye,
  },
  {
    id: 10,
    name: 'P-Square',
    photoUrl: psquare,
  },
  {
    id: 11,
    name: 'Star Boy',
    photoUrl: wizkid,
  },
  {
    id: 12,
    name: 'Flavour',
    photoUrl: flavour,
  },
];
export default function ArtistsPage() {
  return (
    <Box sx={{ bgcolor: '#F4FAFB', height: '100%', width: '100%', pt: 3, pl: 1, pr: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar />
        <UserProfile />
      </Box>
      <Box sx={{ mt: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <PageTitle title="Our Artists" />
        <Filter />
      </Box>
      <Box sx={{ mt: 2, bgcolor: '#fff', borderRadius: '10px', p: 2, width: '100%', height: '70%' }}>
        <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '.8rem' }}>Artist 12</Typography>
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {data.map((item) => (
            <Stack spacing={1} key={item.id}>
              <img src={item.photoUrl} alt={item.name} style={{ width: 67, height: 67 }} />
              <Typography sx={{ color: '#000', fontWeight: '600' }}>{item.name}</Typography>
            </Stack>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
