import React, { useState } from 'react';
import { Box, Typography, IconButton, Badge, Avatar, Menu, MenuItem } from '@mui/material';
import { Notifications, ExpandMore } from '@mui/icons-material';
import img from '../../assets/img.png';
import LogoutButton from '../../layouts/dashboard/navbar/LogoutButton';

export default function UserProfile() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
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
        <IconButton size="small" onClick={handleMenuClick}>
          <ExpandMore sx={{ color: '#fff' }} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>
            <LogoutButton />
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
