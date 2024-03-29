import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, useTheme, CircularProgress, Grid, Button, styled } from '@mui/material';
import PropTypes from 'prop-types';

const GameButton = styled(Button)({
  textAlign: 'center',
  fontWeight: '400',
  width: '100%',
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
                <Box sx={{ height: '70%' }} component={RouterLink} to={`${baseLink}/${item.uid}`}>
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
                  <Box>
                    <Grid container sx={{ mt: '0.5rem' }} spacing={'0.3rem'}>
                      <Grid item xs={6}>
                        <GameButton
                          size="small"
                          variant="outlined"
                          component={RouterLink}
                          to={`/dashboard/quiz-results/${item.uid}`}
                        >
                          Quiz
                        </GameButton>
                      </Grid>
                      <Grid item xs={6}>
                        <GameButton
                          size="small"
                          variant="outlined"
                          component={RouterLink}
                          to={`/dashboard/music-match-results/${item.uid}`}
                        >
                          Music match
                        </GameButton>
                      </Grid>
                      <Grid item xs={6}>
                        <GameButton
                          size="small"
                          variant="outlined"
                          component={RouterLink}
                          to={`/dashboard/raffle-draw-results/${item.uid}`}
                        >
                          Raffle draw
                        </GameButton>
                      </Grid>
                      <Grid item xs={6}>
                        <GameButton
                          size="small"
                          variant="outlined"
                          color="success"
                          component={RouterLink}
                          to={`/dashboard/ticket-winners/${item.uid}`}
                        >
                          Winners
                        </GameButton>
                      </Grid>
                    </Grid>
                  </Box>
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
