import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Switch, Stack, Grid, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';
import path from 'path';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import upload from '../../../assets/upload.png';
import { requests } from '../../../api/requests';
import useFirebase from '../../../hooks/useFirebase';
import deleteIcon from '../../../assets/deleteIcon.png';

export default function MusicMatch() {
  const [audio, setAudio] = useState(null);
  const [musicMatches, setMusicMatches] = useState([]);
  const [, setError] = useState('');
  const { eventId } = useParams();
  const { user } = useFirebase();
  const audioRef = useRef(null);

  const handleAudioChange = async (e) => {
    if (!e.target.files.length) return null;
    const file = e.target.files[0];
    setAudio(file);
    const fileExtension = path.extname(file.name);

    if (!['.wav', '.mp3', '.webm'].includes(fileExtension.toLowerCase())) {
      setError(`Unsupported file format: ${fileExtension}`);
      return null;
    }
    return null;
  };

  const handleDeleteMusicMatch = async (musicMatchId, _index) => {
    try {
      setMusicMatches((prevMusicMatches) => prevMusicMatches.filter((musicMatch, index) => index !== _index));
      await requests.deleteMusicMatch(musicMatchId, user.idToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectAudio = () => {
    audioRef.current.click();
  };

  useEffect(() => {
    async function fetchEventMusicMatch() {
      try {
        // setIsLoading(true);
        const { data } = await requests.getEventMusicMatch(eventId, user.idToken);
        setMusicMatches(data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEventMusicMatch();
  }, [eventId, user.idToken]);

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

      <Box sx={{ bgcolor: '#fff', borderRadius: '40px', height: 'auto', mt: '1rem', p: '2rem' }}>
        {musicMatches.map((musicMatch, index) => (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3rem', mb: '2rem' }} key={Math.random()}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                <audio controls>
                  <source src={musicMatch.audioUrl} type="audio/mp3" />
                  <track src="thg.vtt" kind="captions" label="English" default />
                </audio>
                <Stack>
                  <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '1rem' }}>
                    {musicMatch.songTitle}
                  </Typography>
                  <Typography sx={{ color: '#868686', fontWeight: '400', fontSize: '.9rem' }}>
                    By {musicMatch.songArtist}
                  </Typography>
                </Stack>
              </Stack>
              <Stack>
                <IconButton onClick={() => handleDeleteMusicMatch(musicMatch.uid, index)}>
                  <img src={deleteIcon} alt="edit" style={{ height: 25, width: 25 }} />
                </IconButton>
              </Stack>
            </Box>
            <Typography sx={{ color: '#868686', fontWeight: '400' }}>{musicMatch.songLyrics}</Typography>
          </Box>
        ))}
      </Box>

      <Formik
        initialValues={{
          songTitle: '',
          artist: '',
          lyrics: '',
        }}
        validationSchema={Yup.object({
          songTitle: Yup.string().required('Song title is required'),
          artist: Yup.string().required('Artist is required'),
          lyrics: Yup.string().required('lyrics is required'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (audio === null) {
            throw new Error('Audio was not selected');
          }
          const formData = new FormData();
          formData.append('songArtist', values.artist);
          formData.append('songTitle', values.songTitle);
          formData.append('songLyrics', values.lyrics);
          formData.append('eventId', eventId);
          formData.append('audio', audio);
          try {
            await requests.createMusicMatch(formData, user.idToken);
            setMusicMatches([
              ...musicMatches,
              {
                songArtist: values.artist,
                songTitle: values.songTitle,
                songLyrics: values.lyrics,
                audioUrl: URL.createObjectURL(audio),
              },
            ]);
            setSubmitting(false);
            resetForm();
          } catch (error) {
            console.log(error.request.responseText);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <Box sx={{ height: 'auto', borderRadius: '10px', border: '1px solid #ABABAB', mt: '1rem', p: '1rem' }}>
              <Grid container spacing={2} alignItems="center" sx={{ height: '38%', mb: '1rem' }}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ borderRadius: '10px', border: '1px solid #ABABAB', height: '100%' }}>
                    <Stack sx={{ px: '2rem', py: '1.5rem' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AddIcon sx={{ color: '#868686' }} />
                        <Typography sx={{ color: '#868686' }}>New Audio File</Typography>
                      </Box>
                      <IconButton onClick={handleSelectAudio}>
                        <img src={upload} alt="upload" />
                      </IconButton>
                    </Stack>
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      accept="audio/mp3,audio/*"
                      ref={audioRef}
                      onChange={handleAudioChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field name="songTitle">
                    {({ field, form }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        placeholder="Song Title"
                        fullWidth
                        error={form.errors.songTitle && form.touched.songTitle}
                        helperText={form.errors.songTitle}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field name="artist">
                    {({ field, form }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        placeholder="Artist"
                        fullWidth
                        error={form.errors.artist && form.touched.artist}
                        helperText={form.errors.artist}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Field name="lyrics">
                    {({ field, form }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        placeholder="Song Lyrics"
                        fullWidth
                        multiline
                        rows={6}
                        error={form.errors.lyrics && form.touched.lyrics}
                        helperText={form.errors.lyrics}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton
                      variant="contained"
                      startIcon={<AddIcon />}
                      type="submit"
                      loading={isSubmitting}
                      sx={{
                        background: '#FF6C2C',
                        boxShadow: 'none',
                        px: '2rem',
                        mt: '1.5rem',
                        borderRadius: '5px',
                        alignSelf: 'flex-end',
                        '&:hover': {
                          color: '#FF6C2C',
                          background: '#FFFFFF',
                          border: '2px solid #FF6C2C',
                        },
                      }}
                    >
                      Add Beat
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
