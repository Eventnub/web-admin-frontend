import React from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import wonIcon from '../../../assets/won.png';
import failedIcon from '../../../assets/failed.png';

const Text = styled(Typography)({
  color: '#000',
  fontWeight: '400',
  fontSize: '.8rem',
});

const Question = styled(Typography)({
  color: '#515151',
  fontSize: '.7rem',
  fontWeight: '400',
});

const Answer = styled(Typography)({
  color: '#515151',
  fontSize: '.7rem',
  fontWeight: '700',
});

export default function ScoresTable({ quizResults }) {
  return (
    <Box sx={{ bgcolor: '#fff', height: 'auto', width: 'auto', mt: 5, borderRadius: '10px', p: 2, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '.8rem' }}>Scores Table</Typography>
        <TextField select defaultValue="All" sx={{ minWidth: '210px' }}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Passed">Passed</MenuItem>
          <MenuItem value="Failed">Failed</MenuItem>
        </TextField>
      </Box>
      <Box sx={{ mt: 2 }}>
        {quizResults.map((item, index) => (
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
                  <Text>Scored</Text>
                  <Box
                    sx={{
                      width: '39px',
                      height: '21px',
                      borderRadius: '360px',
                      bgcolor: '#D0D0D0',
                      p: '.1rem',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ color: '#000', fontSize: '.7rem', fontWeight: '700' }}>
                      {item.numberOfPasses}
                    </Typography>

                    <Typography sx={{ color: '#000', fontSize: '.7rem', fontWeight: '700' }}>
                      {`${'/'} ${item.numberOfQuestions}`}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 0.5, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Text>{item.numberOfPasses === item.numberOfQuestions ? 'Passed' : 'Failed'}</Text>
                  <img src={item.numberOfPasses === item.numberOfQuestions ? wonIcon : failedIcon} alt="game" />
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ ml: 6 }}>
              <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '700' }}>Answers</Typography>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', mt: 1 }}>
                {item.questionAndAnswers.map((question, index) => (
                  <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', gap: 1 }} key={Math.random()}>
                    <Question>Question: {index + 1}</Question>
                    <Answer> {question.userAnswer}</Answer>
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

ScoresTable.propTypes = {
  quizResults: PropTypes.array,
};
