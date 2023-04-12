import React from 'react';
import { Box, Typography, IconButton, Badge, Avatar } from '@mui/material';
import { Notifications, ExpandMore } from '@mui/icons-material';
import img from '../../assets/img.png';

export default function UserProfile() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Badge
        color="secondary"
        variant="dot"
        sx={{
          '& .MuiBadge-badge': {
            right: 8,
            top: 5,
            border: `2px solid #fff`,
            // padding: '0 4px',
          },
        }}
      >
        <Notifications sx={{ color: '#FF6C2C' }} />
      </Badge>
      <Box
        sx={{
          bgcolor: '#555555',
          width: 170,
          height: 55,
          display: 'flex',
          alignItems: 'center',
          px: 1,
          py: 1.5,
          gap: '.5rem',
        }}
      >
        <Avatar alt="Remy Sharp" src={img} variant="rounded" />
        <Typography sx={{ color: '#fff' }}>Eventnub</Typography>
        <IconButton size="small">
          <ExpandMore sx={{ color: '#fff' }} />
        </IconButton>
      </Box>
    </Box>
  );
}
