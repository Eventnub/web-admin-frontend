import React from 'react';
import { Box, Typography, Accordion, AccordionDetails, AccordionSummary, styled, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import play from '../../../assets/play.png';

const Text = styled(Typography)({
  color: '#000',
  fontWeight: '400',
  fontSize: '.8rem',
});

export default function PendingAudio({ pendingMusicMatchValidations }) {
  return (
    <Box sx={{ bgcolor: '#fff', height: 'auto', width: '100%', mt: 5, borderRadius: '10px', p: 2 }}>
      <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '.8rem' }}>Pending Audios</Typography>
      <Box sx={{ mt: 2 }}>
        {pendingMusicMatchValidations.map((item) => (
          <Accordion sx={{ bgcolor: '#FAFAFA', mb: 1 }} key={Math.random()}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography sx={{ color: '#000', fontWeight: '400' }}>{item.id}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 4, width: '100%' }}>
                <Box sx={{ flex: 0.5, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Text>Beat</Text>
                  <img src={play} alt="play" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" spacing={0.5}>
                    <Text>{item.musicUnison.songTitle}</Text>
                    <Text>by </Text>
                    <Text>{item.musicUnison.songArtist}</Text>
                  </Stack>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Text>Voice Recording</Text>
                  <img src={play} alt="play" />
                </Box>{' '}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Text>Missed Words</Text>
                  <Box sx={{ width: '20px', height: '20px', borderRadius: '50%', bgcolor: '#D0D0D0', p: '.1rem' }}>
                    <Typography sx={{ color: '#000', fontSize: '.7rem', fontWeight: '700', textAlign: 'center' }}>
                      {item.missedWords}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 0.5, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Typography sx={{ color: '#000', fontWeight: '400' }}>---------</Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ ml: 6 }}>
              <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '700' }}>Lyrics</Typography>
              <Typography sx={{ fontWeight: '400', color: '#515151', fontSize: '.8rem', mt: 1 }}>
                {item.musicUnison.songLyrics}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: '.5rem' }}>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/dashboard/validate-audio/${item.uid}`}
                  sx={{ boxShadow: 'none', color: '#FF6C2C', border: '1px solid #FF6C2C' }}
                >
                  Validate
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

PendingAudio.propTypes = {
  pendingMusicMatchValidations: PropTypes.array,
};
