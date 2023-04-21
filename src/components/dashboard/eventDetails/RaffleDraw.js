import React from 'react';
import { Box, Typography, Switch, TextField, InputAdornment } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { requests } from '../../../api/requests';
import useFirebase from '../../../hooks/useFirebase';

export default function RaffleDraw() {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Typography>Edit and set raffle draw starting number</Typography>
        <Formik
          initialValues={{
            raffleNumber: '',
          }}
          validationSchema={Yup.object({
            raffleNumber: Yup.string().required('Raffle start number is required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log(values.raffleNumber);
            try {
              const data = {
                eventId,
                firstNumber: values.raffleNumber,
              };
              await requests.createRaffleDraw(data, user.idToken);
              setSubmitting(false);
              resetForm();
            } catch (error) {
              console.log(error.request.responseText);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <Field name="raffleNumber">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder="Raffle Start Number"
                      fullWidth
                      error={form.errors.raffleNumber && form.touched.raffleNumber}
                      helperText={form.errors.raffleNumber}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                            <Typography sx={{ color: '#1358A5', fontWeight: '500', fontSize: '1.2rem' }}>
                              Edit
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={isSubmitting}
                  sx={{ background: '#FF6C2C', boxShadow: 'none' }}
                >
                  Add
                </LoadingButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
