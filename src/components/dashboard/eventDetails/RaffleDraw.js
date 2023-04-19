import React from 'react';
import { Box, Typography, Switch } from '@mui/material';

export default function RaffleDraw() {
  return (
    <Box
      sx={{
        mt: '4rem',
        bgcolor: '#fff',
        height: 80,
        borderRadius: '80px',
        p: '2rem',
        boxShadow: '0px 0px 1px 1px  rgba(0, 0, 0, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ color: '#000', fontSize: '1.2rem', fontWeight: '500' }}>
        Enable raffle draw for this event
      </Typography>
      <Switch />
    </Box>
  );
}
