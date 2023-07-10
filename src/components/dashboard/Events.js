import React from 'react';
import { Box, Typography, useTheme, CircularProgress, Stack, Button, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GameButton = styled(Button)({
  textAlign: 'center',
  fontWeight: '400',
});

export default function Events({ events, isLoading, title, baseLink }) {
  const theme = useTheme();
  const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '1.2rem' }}>
          {title}
          <span style={{ color: '#000', fontWeight: '700', fontSize: '.8rem' }}>
            {events.length < 10 ? `0${events.length}` : events.length}
          </span>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mt: '2rem', gap: '5rem', height: 'auto' }}>
        {isLoading ? (
          <Box sx={{ m: 'auto' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {events.map((item) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '261px',
                  height: '218px',
                  mb: '1.5rem',
                  [theme.breakpoints.down('sm')]: {
                    width: '100%',
                    height: '50%',
                  },
                }}
                key={Math.random()}
              >
                <Box sx={{ height: '70%' }} component={Link} to={`${baseLink}/${item.uid}`}>
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '10px',
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: '4%', height: 'auto', mt: '2%' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography sx={{ fontWeight: '400', fontSize: '.9rem', color: '#000', textAlign: 'center' }}>
                      {item.date.substring(8)}
                    </Typography>
                    <Typography sx={{ fontWeight: '400', fontSize: '.9rem', color: '#000', textAlign: 'center' }}>
                      {month[Number(item.date.substring(5, 7)) - 1]}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ color: '#000', fontWeight: '600', fontSize: '.9rem', textTransform: 'capitalize' }}
                    >
                      {item.name}
                    </Typography>
                    {baseLink === '/dashboard/event-details' && (
                      <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '.7rem' }}>
                        {item.description}
                      </Typography>
                    )}
                  </Box>
                </Box>
                {baseLink !== '/dashboard/event-details' && (
                  <Stack direction="row" justifyContent="space-between" sx={{ mt: '1rem' }}>
                    <GameButton
                      size="small"
                      variant="outlined"
                      color="error"
                      component={Link}
                      to={`/dashboard/quiz-results/${item.uid}`}
                    >
                      Quiz
                    </GameButton>
                    <GameButton
                      size="small"
                      variant="outlined"
                      color="success"
                      component={Link}
                      to={`/dashboard/music-match-results/${item.uid}`}
                    >
                      Music match
                    </GameButton>
                    <GameButton
                      size="small"
                      variant="outlined"
                      color="warning"
                      component={Link}
                      to={`/dashboard/raffle-draw-results/${item.uid}`}
                    >
                      Raffle draw
                    </GameButton>
                  </Stack>
                )}
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}

Events.propTypes = {
  events: PropTypes.array,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  baseLink: PropTypes.string,
};

Events.defaultProps = {
  baseLink: '/dashboard/event-details',
};
