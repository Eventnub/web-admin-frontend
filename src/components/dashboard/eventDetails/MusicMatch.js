import React from 'react';
import { Box, Typography, Switch, Stack, IconButton, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
import upload from '../../../assets/upload.png';

export default function MusicMatch() {
  return (
    <Box sx={{ mt: '4rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '1.5rem' }}>Music Match Game</Typography>
        <Switch />
      </Box>
      <Typography sx={{ color: '#000' }}>
        Add a short beat of a particular song and let the fan play the game of guessing the song title and the artist of
        the music within 30 seconds.
      </Typography>
      <Formik
        initialValues={{
          startDate: '',
          endDate: '',
        }}
      >
        {() => (
          <Form autoComplete="off">
            <Box sx={{ bgcolor: '#fff', borderRadius: '40px', height: 250, mt: '1rem', p: '2rem' }}>k</Box>
            <Box sx={{ height: 'auto', borderRadius: '10px', border: '1px solid #ABABAB', mt: '1rem', p: '1rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '38%', gap: '.5rem', mb: '1rem' }}>
                <Box sx={{ borderRadius: '10px', border: '1px solid #ABABAB', flex: 1, height: '100%' }}>
                  <Stack sx={{ px: '2rem', py: '1.5rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AddIcon sx={{ color: '#868686' }} />
                      <Typography sx={{ color: '#868686' }}>New Audio File</Typography>
                    </Box>
                    <IconButton>
                      <img src={upload} alt="upload" />
                    </IconButton>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    flex: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ width: '100%', height: '40%', bgcolor: '#F3F3F3', borderRadius: '10px' }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <TextField variant="outlined" placeholder="Song Title" fullWidth />
                    <TextField variant="outlined" placeholder="Artist" fullWidth />
                  </Box>
                </Box>
              </Box>
              <TextField variant="outlined" placeholder="Song Lyrics" fullWidth multiline rows={6} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    background: '#FF6C2C',
                    boxShadow: 'none',
                    width: '20%',
                    height: '15%',
                    mt: '1.5rem',
                    borderRadius: '5px',
                    alignSelf: 'flex-end',
                  }}
                >
                  Add Quiz
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
