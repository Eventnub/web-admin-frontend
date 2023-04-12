import React, { useState } from 'react';
import { Select, MenuItem, Box } from '@mui/material';

export default function Filter() {
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [artist, setArtist] = useState('');

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
      <Select value={artist} onChange={handleArtistChange} displayEmpty sx={{ height: '30px', borderRadius: '30px' }}>
        <MenuItem value="">Artist</MenuItem>
        <MenuItem value={10}>Option 1</MenuItem>
        <MenuItem value={20}>Option 2</MenuItem>
      </Select>
      <Select value={state} onChange={handleStateChange} displayEmpty sx={{ height: '30px', borderRadius: '30px' }}>
        <MenuItem value="">State</MenuItem>
        <MenuItem value={10}>Option 1</MenuItem>
        <MenuItem value={20}>Option 2</MenuItem>
      </Select>
      <Select value={country} onChange={handleCountryChange} displayEmpty sx={{ height: '30px', borderRadius: '30px' }}>
        <MenuItem value="">Country</MenuItem>
        <MenuItem value={10}>Option 1</MenuItem>
        <MenuItem value={20}>Option 2</MenuItem>
      </Select>
    </Box>
  );
}
