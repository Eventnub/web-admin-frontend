import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
  Stack,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import play from '../../../assets/play.png';
import wonIcon from '../../../assets/won.png';
import failedIcon from '../../../assets/failed.png';

const Text = styled(Typography)({
  color: '#000',
  fontWeight: '400',
  fontSize: '.8rem',
});

export default function ValidatedAudio({ loading, validatedMusicMatchSubmissions }) {
  if (loading) {
    return (
      <Box sx={{ bgcolor: '#fff', height: 'auto', width: '100%', mt: 5, borderRadius: '10px', p: 2 }}>
        <Typography sx={{ olor: '#909090', fontWeight: '400', fontSize: '.8rem' }}>Validated Audios</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (validatedMusicMatchSubmissions.length === 0) {
    return (
      <Box sx={{ bgcolor: '#fff', height: 'auto', width: '100%', mt: 5, borderRadius: '10px', p: 2 }}>
        <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '.8rem' }}>Validated Audios</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ color: 'grey.600', fontWeight: '400', fontSize: '.9rem', textAlign: 'center' }}>
            There are no validated submissions
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#fff', height: 'auto', width: '100%', mt: 5, borderRadius: '10px', p: 2 }}>
      <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '.8rem' }}>Validated Audios</Typography>
      <Box sx={{ mt: 2 }}>
        {validatedMusicMatchSubmissions.map((item) => (
          <Accordion sx={{ bgcolor: '#FAFAFA', mb: 1 }} key={item.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography sx={{ color: '#000', fontWeight: '400' }}>{item.id}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 4, width: '100%' }}>
                <Box sx={{ flex: 0.5, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <Text>Beat</Text>
                  <img src={play} alt="play" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" spacing={0.5}>
                    <Text>{item?.musicUnison?.songTitle}</Text>
                    <Text>by </Text>
                    <Text>{item?.musicUnison?.songArtist}</Text>
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
                      {item?.wrongWords?.length}
                    </Typography>
                  </Box>
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
                {item?.musicUnison?.songLyrics}
              </Typography>
              <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '700', mt: 1.2 }}>
                Words Missed
              </Typography>
              <Typography sx={{ color: '#FF0000', fontWeight: '400', fontSize: '.8rem', mt: 1 }}>
                {item?.wrongWords?.join(', ')}
              </Typography>
              <Box sx={{ mt: 1.2, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Stack direction="row" spacing={0.5}>
                  <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '700' }}>
                    Percentage score:
                  </Typography>
                  <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '400' }}>
                    {(item.accuracyRatio * 100).toFixed(2)}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '700' }}>Validator:</Typography>
                  <Typography sx={{ color: '#000', fontSize: '.8rem', fontWeight: '400' }}>{'Admin'}</Typography>
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

ValidatedAudio.propTypes = {
  loading: PropTypes.bool,
  validatedMusicMatchSubmissions: PropTypes.array,
};
