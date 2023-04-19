import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function Quiz() {
  return (
    <Box sx={{ mt: '4rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '2rem' }}>
        <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '1.5rem' }}>Enable Quiz Game</Typography>
        <Switch />
      </Box>
      <Formik
        initialValues={{
          startDate: '',
          endDate: '',
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Stack sx={{ flex: 1 }}>
                <Typography>Set Start Date</Typography>
                <Field name="startDate">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder="Set Start Date"
                      type="date"
                      fullWidth
                      error={form.errors.startDate && form.touched.startDate}
                      helperText={form.errors.startDate}
                    />
                  )}
                </Field>
              </Stack>
              <Stack sx={{ flex: 1 }}>
                <Typography>Set End Date</Typography>
                <Field name="endDate">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder="Set End Date"
                      type="date"
                      fullWidth
                      error={form.errors.endDate && form.touched.endDate}
                      helperText={form.errors.endDate}
                    />
                  )}
                </Field>
              </Stack>
            </Box>
            <Box sx={{ height: 80, bgcolor: '#fff', mt: '1rem', borderRadius: '10px' }}>g</Box>
            <Box sx={{ height: 380, borderRadius: '10px', border: '1px solid #ABABAB', mt: '1rem', p: '1rem' }}>
              <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '1.5rem' }}>Add New Quiz</Typography>
              <Typography sx={{ color: '#000', mb: '2rem' }}>Add quiz and raffle draws for this event</Typography>
              <TextField variant="outlined" placeholder="Question" fullWidth />
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', gap: '1rem' }}>
                <TextField variant="outlined" placeholder="Option 1" fullWidth />
                <TextField variant="outlined" placeholder="Option 2" fullWidth />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', gap: '1rem' }}>
                <TextField variant="outlined" placeholder="Option 3" fullWidth />
                <TextField variant="outlined" placeholder="Option 4" fullWidth />
              </Box>
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
