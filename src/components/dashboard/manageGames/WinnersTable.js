import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  CircularProgress,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { capitalCase } from 'change-case';

const Text = styled(Typography)({
  color: '#000',
  fontWeight: '400',
  fontSize: '.8rem',
});

const Heading = styled(Typography)({
  color: '#515151',
  fontSize: '0.8rem',
  fontWeight: '400',
});

const Content = styled(Typography)({
  color: '#515151',
  fontSize: '0.8rem',
  fontWeight: '700',
});

export default function WinnersTable({ loading, quizAndMusicMatchWinners, raffleDrawWinners }) {
  const [filteredWinners, setFilteredWinners] = useState([]);

  const getAllWinners = () => [...quizAndMusicMatchWinners, ...raffleDrawWinners];

  const handleFilterChange = (e) => {
    switch (e.target.value) {
      case 'All':
        setFilteredWinners(getAllWinners());
        break;
      case 'Quiz & Music Match':
        setFilteredWinners(quizAndMusicMatchWinners);
        break;
      case 'Raffle Draw':
        setFilteredWinners(raffleDrawWinners);
        break;
      default:
        setFilteredWinners(getAllWinners());
    }
  };

  useEffect(() => {
    setFilteredWinners(getAllWinners());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizAndMusicMatchWinners, raffleDrawWinners]);

  return (
    <Box sx={{ bgcolor: '#fff', height: 'auto', width: 'auto', mt: 5, borderRadius: '10px', p: 2, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '.8rem' }}>Winners Table</Typography>
        <TextField select defaultValue="All" sx={{ minWidth: '210px' }} onChange={handleFilterChange}>
          <MenuItem value="All" selected>
            All
          </MenuItem>
          <MenuItem value="Quiz & Music Match">Quiz & Music Match</MenuItem>
          <MenuItem value="Raffle Draw">Raffle Draw</MenuItem>
        </TextField>
      </Box>
      <Box sx={{ mt: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {filteredWinners.map((item, index) => (
              <Accordion sx={{ bgcolor: '#FAFAFA', mb: 1 }} key={Math.random()}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                  <Typography sx={{ color: '#000', fontWeight: '400' }}>
                    {`${(index + 1).toString().padStart(2, '0')}`}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 4, width: '100%' }}>
                    <Box sx={{ flex: 0.5 }}>
                      <Text>{`${item.user?.firstName} ${item.user?.lastName}`}</Text>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Text>{item.user.email}</Text>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                      <Typography sx={{ color: '#000', fontSize: '.7rem', fontWeight: '700' }}>
                        {capitalCase(item.medium)}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ ml: 6 }}>
                  {item.medium === 'quiz and music match' ? (
                    <Box>
                      <Stack direction="row" spacing={1}>
                        <Heading>Quiz score:</Heading>
                        <Content>{item.quizRecord.numberOfPasses}</Content>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Heading>Music match accuracy:</Heading>
                        <Content>{item.musicUnisonRecord.accuracyRatio}%</Content>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Heading>Ticket won:</Heading>
                        <Content>{item.ticketWon.type}</Content>
                      </Stack>
                    </Box>
                  ) : (
                    <Box>
                      <Stack direction="row" spacing={1}>
                        <Heading>Raffle draw score:</Heading>
                        <Content>{item.raffleDrawRecord.numberOfCorrectMatches}</Content>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Heading>Ticket won:</Heading>
                        <Content>{item.ticketWon.type}</Content>
                      </Stack>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}

WinnersTable.propTypes = {
  loading: PropTypes.bool,
  quizAndMusicMatchWinners: PropTypes.array,
  raffleDrawWinners: PropTypes.array,
};
