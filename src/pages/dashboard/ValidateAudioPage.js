import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider, Slider, Stack, Typography, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import UserProfile from '../../components/dashboard/UserProfile';
import PageTitle from '../../components/dashboard/PageTitle';
import { requests } from '../../api/requests';
import useFirebase from '../../hooks/useFirebase';

export default function ValidateAudioPage() {
  const [pendingMusicMatchValidation, setPendingMusicMatchValidation] = useState(null);
  const audioRef = useRef(null);
  const [, setSpeed] = useState(1);
  const { musicMatchSubmissionId } = useParams();
  const { user } = useFirebase();

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
    audioRef.current.playbackRate = event.target.value;
  };

  useEffect(() => {
    async function getPendingMusicMatchValidations() {
      try {
        const { data } = await requests.pendingValidations(user.idToken);
        const [musicMatch] = data.filter((item) => (item.uid = musicMatchSubmissionId));
        setPendingMusicMatchValidation(musicMatch);
      } catch (error) {
        console.log(error);
      }
    }
    getPendingMusicMatchValidations();
  }, [user.idToken, musicMatchSubmissionId]);

  return (
    <Box sx={{ height: '100%', width: '100%', bgcolor: '#fff', pt: 3, pl: 2, pr: 2, pb: '2rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PageTitle title="Validate Audio" />
        <UserProfile />
      </Box>
      <Box
        sx={{
          height: '20%',
          width: '100%',
          bgcolor: '#EDF5F6',
          mt: '2rem',
          borderRadius: '10px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          p: '.8rem',
        }}
      >
        <Typography sx={{ color: '#000', fontWeight: '600' }}>Recorded Audio</Typography>
        <Box sx={{ mt: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* <Box
            sx={{
              bgcolor: '#fff',
              height: '30%',
              borderRadius: '12px',
              boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.25)',
              p: '.5rem',
            }}
          > */}
          {pendingMusicMatchValidation && (
            <audio controls ref={audioRef}>
              <source src={pendingMusicMatchValidation.audioUrl} type="audio/mp3" />
              <track src="thg.vtt" kind="captions" label="English" />
            </audio>
          )}

          {/* </Box> */}
          <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '1.5rem' }}>
            {pendingMusicMatchValidation?.musicUnison.songTitle} by{' '}
            {pendingMusicMatchValidation?.musicUnison.songArtist}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: '#fff',
            mt: '1rem',
            height: '20%',
            width: '27%',
            py: '.3rem',
            px: '1rem',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '10px',
          }}
        >
          <Typography sx={{ color: '#000', fontSize: '.7rem', width: '40%', fontWeight: '400' }}>Play speed</Typography>
          <Slider
            step={0.5}
            marks
            min={0.5}
            max={4.0}
            defaultValue={1}
            onChange={handleSpeedChange}
            sx={{ color: '#6750A4' }}
          />
        </Box>
      </Box>
      <Typography sx={{ mt: '.7rem', color: '#000', fontWeight: '600' }}>Orignal Lyrics</Typography>
      <Typography sx={{ mt: '.7rem', fontWeight: '400', color: '#000' }}>
        {pendingMusicMatchValidation?.musicUnison.songLyrics}
      </Typography>
      <Divider sx={{ my: '1rem' }} />
      <Box sx={{ bgcolor: '#F5F5F5', p: '.8rem', height: '17%', borderRadius: '8.35px' }}>
        <Typography sx={{ color: '#515151', fontWeight: '400' }}>
          Using the lyrics above pick out words and sentences that were not captured or not represented well from the
          recorded audio. Separate each word with a comma “,”
        </Typography>
        <Stack direction="row" spacing=".2rem" mt=".3rem">
          <Typography sx={{ color: '#515151', fontWeight: '600' }}>Hint:</Typography>
          <Typography sx={{ color: '#515151', fontWeight: '400' }}>
            Look at the lyrics while listening to the recording
          </Typography>
        </Stack>
        <Stack direction="row" spacing=".2rem" mt=".3rem">
          <Typography sx={{ color: '#515151', fontWeight: '600' }}>Note:</Typography>
          <Typography sx={{ color: '#515151', fontWeight: '400' }}>
            Use earphone for clarity of words, wrong validation can lead to disqualification from being a validator.
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ mt: '1.5rem', mb: '1.5rem' }}>
        <Formik
          initialValues={{
            wrongWords: '',
          }}
          validationSchema={Yup.object({
            wrongWords: Yup.string().required('Words wrongly represented or not found are required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const data = {
                musicUnisonSubmissionId: musicMatchSubmissionId,
                wrongWords: values.wrongWords,
              };
              await requests.submitMusicMatchVAlidation(data, user.idToken);
              setSubmitting(false);
              resetForm();
            } catch (error) {
              console.log(error);
            }
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <Field name="wrongWords">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Words wrongly represented or not found"
                    fullWidth
                    multiline
                    rows={6}
                    error={form.errors.eventName && form.touched.eventName}
                    helperText={form.errors.eventName}
                  />
                )}
              </Field>
              <Box sx={{ mt: '1.5rem', display: 'flex', justifyContent: 'flex-end', mb: '1.5rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  {/* <Button variant="contained" sx={{ bgcolor: '#ABABAB', boxShadow: 'none' }}>
                    Cancel Validation
                  </Button> */}
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={isSubmitting}
                    sx={{ bgcolor: '#1358A5', boxShadow: 'none', borderRadius: '5px' }}
                  >
                    Submit Validation
                  </LoadingButton>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
