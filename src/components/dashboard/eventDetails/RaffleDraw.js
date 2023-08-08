import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography, Switch, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { requests } from '../../../api/requests';
import useFirebase from '../../../hooks/useFirebase';

export default function RaffleDraw({ raffleStartNumber }) {
  const { eventId } = useParams();
  const { user } = useFirebase();

  return (
    <Box>
      <Box
        sx={{
          mt: '4rem',
          bgcolor: '#fff',
          height: 80,
          borderRadius: '80px',
          p: '2rem',
          boxShadow: '0px 0px 1px 1px  rgba(0, 0, 0, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ color: '#000', fontSize: '1.2rem', fontWeight: '500' }}>
          Enable raffle draw for this event
        </Typography>
        <Switch />
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <Typography sx={{ mb: { xs: '0.5rem' } }}>Edit and set raffle draw starting number</Typography>
        <Formik
          initialValues={{
            raffleStartNumber,
          }}
          enableReinitialize
          validationSchema={Yup.object({
            raffleStartNumber: Yup.string().required('Raffle start number is required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const data = {
                eventId,
                firstNumber: values.raffleStartNumber,
              };
              await requests.createRaffleDraw(data, user.idToken);
              setSubmitting(false);
              resetForm();
            } catch (error) {
              console.log(error.request.responseText);
            }
          }}
        >
          {({ isSubmitting, values, initialValues }) => (
            <Form autoComplete="off">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <Field name="raffleStartNumber">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder="Raffle Start Number"
                      type="number"
                      fullWidth
                      error={form.errors.raffleStartNumber && form.touched.raffleStartNumber}
                      helperText={form.errors.raffleStartNumber}
                    />
                  )}
                </Field>
                <LoadingButton
                  size="large"
                  variant="contained"
                  type="submit"
                  loading={isSubmitting}
                  disabled={values.raffleStartNumber === initialValues.raffleStartNumber}
                  sx={{
                    background: '#FF6C2C',
                    boxShadow: 'none',
                    '&:hover': {
                      color: '#FF6C2C',
                      background: '#FFFFFF',
                      border: '2px solid #FF6C2C',
                    },
                  }}
                >
                  Save
                </LoadingButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Stack>
    </Box>
  );
}

RaffleDraw.propTypes = {
  raffleStartNumber: PropTypes.number,
};
