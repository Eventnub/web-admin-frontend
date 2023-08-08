import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import bg from '../../assets/bg.jpg';
import logo from '../../assets/logo.png';
import blueLogo from '../../assets/blueLogo.png';
import LoginForm from '../../sections/auth/login/LoginForm';

export default function LogIn() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
      <Box
        sx={{
          flex: 1,
          p: { xs: '2rem', lg: '4rem' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={blueLogo} alt="logo" style={{ width: '80px' }} />
          <Typography variant="h4" sx={{ color: '#1358A5', fontWeight: '600', letterSpacing: '.2rem' }}>
            eventnub
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: "1.5rem" }}>
          <Typography sx={{ color: '#000', fontSize: '2rem', fontWeight: '400' }}>Login</Typography>
          <Typography sx={{ color: '#616161', fontWeight: '400', fontSize: '1rem', mb: 5 }}>
            Enter your email and password to continue
          </Typography>
          <LoginForm />
        </Box>
        <Typography sx={{ color: '#616161', fontWeight: 400, fontSize: '1rem', textAlign: 'center' }}>
          Manage all concerts, tickets and artists in one place
        </Typography>
      </Box>
      {!isMatch && (
        <Box
          sx={{
            flex: 1.2,
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(19, 88, 165, 0.68)',
            },
          }}
        >
          <Box sx={{ zIndex: 4, display: 'flex', flexDirection: 'column' }}>
            <img src={logo} alt="logo" />
            <Typography
              sx={{ textAlign: 'center', color: '#fff', fontWeight: '700', fontSize: '2rem', letterSpacing: '.5rem' }}
            >
              eventnub
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
