import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useNavigate } from 'react-router-dom';

export default function PreviousButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton size="small" onClick={handleClick}>
        <ArrowCircleLeftOutlinedIcon sx={{ color: '#FF6C2C' }} />
      </IconButton>
      <Typography sx={{ fontWeight: '600', fontSize: '.8rem', color: '#FF6C2C' }}>Previous</Typography>
    </Box>
  );
}
