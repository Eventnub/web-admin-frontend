import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import filter from '../../../assets/filter.png';
import wonIcon from '../../../assets/won.png';
import failedIcon from '../../../assets/failed.png';

const Text = styled(Typography)({
  color: '#000',
  fontWeight: '400',
  fontSize: '.8rem',
});

const RaffleNumber = styled(Typography)({
  color: '#000',
  fontWeight: '700',
  fontSize: '.6rem',
  textAlign: 'center',
});

export default function RaffleDrawsTable({ raffleDrawResults }) {
  return (
    <Box sx={{ bgcolor: '#fff', height: 'auto', width: '100%', mt: 5, borderRadius: '10px', p: 2, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '.8rem' }}>Draws Table</Typography>
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
          <MenuItem value="Passed">Correct Draws</MenuItem>
          <MenuItem value="Failed">Incorrect Draws</MenuItem>
        </TextField>
      </Box>
      <Box sx={{ mt: '2' }}>
        {raffleDrawResults.map((item, index) => (
          <Accordion sx={{ bgcolor: '#FAFAFA', mb: 1 }} key={Math.random()}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography sx={{ color: '#000', fontWeight: '400' }}>{`${(index + 1)
                .toString()
                .padStart(2, '0')}`}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 4, width: '100%' }}>
                <Box sx={{ flex: 0.5 }}>
                  <Text>{`${item.user?.firstName} ${item.user?.lastName}`}</Text>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Text>{item.user.email}</Text>
                </Box>

                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Text>Correct Draws</Text>
                  <Box
                    sx={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      bgcolor: '#D0D0D0',
                      p: '.1rem',
                    }}
                  >
                    <Typography sx={{ color: '#000', fontSize: '.7rem', fontWeight: '700', textAlign: 'center' }}>
                      {item.numberOfCorrectMatches}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 0.5, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Text>{item.numberOfCorrectMatches >= 3 ? 'Passed' : 'Failed'}</Text>
                  <img src={item.numberOfCorrectMatches >= 3 ? wonIcon : failedIcon} alt="game" />
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ ml: 6 }}>
              <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '700' }}>Numbers Drawn</Typography>
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                {item.chosenNumbers.map((number) => (
                  <Box
                    sx={{
                      height: '27px',
                      width: '26px',
                      bgcolor: '#E3E3E3',
                      borderRadius: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    key={Math.random()}
                  >
                    <RaffleNumber>{number}</RaffleNumber>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

RaffleDrawsTable.propTypes = {
  raffleDrawResults: PropTypes.array,
};
