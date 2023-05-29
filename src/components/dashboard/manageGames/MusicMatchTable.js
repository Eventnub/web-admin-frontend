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

const data = [
  {
    id: '01',
    name: 'John Smith',
    email: 'johnsmith@gmail.com',
    number: '08063309447',
    missedWords: '05',
    game: 'Won',
    lyrics:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    wordsMissed: 'Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit, deft, gyut',
    percentageScore: '45%',
    validator: 'John Smith',
  },
  {
    id: '02',
    name: 'John Smith',
    email: 'johnsmith@gmail.com',
    number: '08063309447',
    missedWords: '10',
    game: 'Lost',
    lyrics:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    wordsMissed: 'Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit, deft, gyut',
    percentageScore: '45%',
    validator: 'John Smith',
  },
  {
    id: '03',
    name: 'John Smith',
    email: 'johnsmith@gmail.com',
    number: '08063309447',
    missedWords: '29',
    game: 'Won',
    lyrics:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    wordsMissed: 'Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit, deft, gyut',
    percentageScore: '45%',
    validator: 'John Smith',
  },
  {
    id: '04',
    name: 'John Smith',
    email: 'johnsmith@gmail.com',
    number: '08063309447',
    missedWords: '05',
    game: 'Lost',
    lyrics:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    wordsMissed: 'Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit, deft, gyut',
    percentageScore: '45%',
    validator: 'John Smith',
  },
];

export default function MusicMatchTable() {
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
        {data.map((item) => (
          <Accordion sx={{ bgcolor: '#FAFAFA', mb: 1 }} key={item.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography sx={{ color: '#000', fontWeight: '400' }}>{item.id}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 4, width: '100%' }}>
                <Box sx={{ flex: 0.5 }}>
                  <Text>{item.name}</Text>
                </Box>
                <Box sx={{ flex: 1 }}>{item.email}</Box>
                <Box sx={{ flex: 1 }}>
                  <Text>{item.number}</Text>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Text>Voice Recording</Text>
                  <img src={play} alt="play" />
                </Box>{' '}
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
