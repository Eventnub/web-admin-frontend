import React from 'react';
import {
  Box,
  Typography,
  InputAdornment,
  TextField,
  MenuItem,
  styled,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import play from '../../../assets/play.png';
import wonIcon from '../../../assets/won.png';
import failedIcon from '../../../assets/failed.png';
import filter from '../../../assets/filter.png';

const Text = styled(Typography)({
  color: '#000',
  fontWeight: '400',
  fontSize: '.8rem',
});

export default function MusicMatchTable({ musicMatchResults }) {
  return (
    <Box sx={{ bgcolor: '#fff', height: 'auto', width: '100%', mt: 5, borderRadius: '10px', p: 2, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '.8rem' }}>Music Match Table</Typography>
        <TextField
          select
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img src={filter} alt="filter" style={{ height: '19px' }} />
              </InputAdornment>
            ),
          }}
          //   onChange={handleFilterChange}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Passed Recordings">Passed Recordings</MenuItem>
          <MenuItem value="Failed Recordings">Failed Recordings</MenuItem>
        </TextField>
      </Box>
      <Box sx={{ mt: 2 }}>
        {musicMatchResults.map((item, index) => (
          <Accordion sx={{ bgcolor: '#FAFAFA', mb: 1 }} key={Math.random()}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography sx={{ color: '#000', fontWeight: '400' }}>{`${(index + 1)
                .toString()
                .padStart(2, '0')}`}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 4, width: '100%' }}>
                <Box sx={{ flex: 0.5 }}>
                  <Text>{`${item.user?.firstName} ${item.user?.lastName}`}</Text>
                </Box>
                <Box sx={{ flex: 1 }}>{item.user.email}</Box>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Text>Voice Recording</Text>
                  <img src={play} alt="play" />
                </Box>
                <Box sx={{ flex: 0.5, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Text>{item.game}</Text>
                  <img src={item.game === 'Won' ? wonIcon : failedIcon} alt={item.game} />
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ ml: 6 }}>
              <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '700' }}>Lyrics</Typography>
              <Typography sx={{ fontWeight: '400', color: '#515151', fontSize: '.8rem', mt: 1 }}>
                {item.lyrics}
              </Typography>
              <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '700', mt: 1.2 }}>
                Words Missed
              </Typography>
              <Typography sx={{ color: '#FF0000', fontWeight: '400', fontSize: '.8rem', mt: 1 }}>
                {item.wordsMissed}
              </Typography>
              <Box sx={{ mt: 1.2, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Stack direction="row" spacing={0.5}>
                  <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '700' }}>
                    Percentage score:
                  </Typography>
                  <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '700' }}>
                    {item.percentageScore}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '700' }}>Validator:</Typography>
                  <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '700' }}>{item.validator}</Typography>
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

MusicMatchTable.propTypes = {
  musicMatchResults: PropTypes.array,
};
