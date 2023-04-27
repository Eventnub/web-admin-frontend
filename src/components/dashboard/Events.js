import React from 'react';
import { Box, Typography, useTheme, CircularProgress, TextField, MenuItem, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import filter from '../../assets/filter.png';

export default function Events({ events, isLoading, title }) {
  const theme = useTheme();

  console.log(events);
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '1.2rem' }}>
          {title}
          <span style={{ color: '#000', fontWeight: '700', fontSize: '.8rem' }}>
            {events.length < 10 ? `0${events.length}` : events.length}
          </span>
        </Typography>

        {/* <TextField
          select
          sx={{ display: title === 'Recently Created' ? 'block' : 'none' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img src={filter} alt="filter" />
              </InputAdornment>
            ),
          }}
          onChange={handleFilterChange}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Created by Admin">Created by Admin</MenuItem>
          <MenuItem value="Created by User">Created by User</MenuItem>
          <MenuItem value="Unapproved Events">Unapproved Events</MenuItem>
        </TextField> */}
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
                  [theme.breakpoints.down('sm')]: { width: '100%', height: '50%' },
                }}
                key={item.uid}
              >
                <Box sx={{ height: '70%' }} component={Link} to={`/dashboard/event-details/${item.uid}`}>
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
                    <Typography sx={{ fontWeight: '600', fontSize: '1.2rem', color: '#000', textAlign: 'center' }}>
                      {item.day}
                    </Typography>
                    <Typography sx={{ fontWeight: '400', fontSize: '.8rem', color: '#000', textAlign: 'center' }}>
                      {item.month}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ color: '#000', fontWeight: '600', fontSize: '.9rem', textTransform: 'capitalize' }}
                    >
                      {item.name}
                    </Typography>
                    <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '.7rem' }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
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
  // handleFilterChange: PropTypes.func,
  title: PropTypes.string,
};
