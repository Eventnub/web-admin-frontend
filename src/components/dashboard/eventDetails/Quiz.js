import React, { useState, useEffect } from 'react';
import { Box, Typography, Switch, TextField, Stack, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { getTime } from 'date-fns';
import useFirebase from '../../../hooks/useFirebase';
import { requests } from '../../../api/requests';
import deleteIcon from '../../../assets/deleteIcon.png';
import editIcon from '../../../assets/editIcon.png';

export default function Quiz({ startDate, endDate }) {
  const [questions, setQuestions] = useState([]);
  const { eventId } = useParams();
  const { user } = useFirebase();

  const handleRemoveQuestion = async (questionId, _index) => {
    try {
      setQuestions((prevQuestions) => prevQuestions.filter((question, index) => index !== _index));
      await requests.deleteQuestion(questionId, user.idToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        // setIsLoading(true);
        const { data } = await requests.getEventQuestion(eventId, user.idToken);
        setQuestions(data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, [eventId, user.idToken]);
  console.log(questions);
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
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: '',
        }}
        validationSchema={Yup.object({
          question: Yup.string().required('Question is required'),
          option1: Yup.string().required('Option 1 is required'),
          option2: Yup.string().required('Option 2 is required'),
          option3: Yup.string().required('Option 3 is required'),
          option4: Yup.string().required('Option 4 is required'),
          answer: Yup.string().required('Answer is required'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log({ startDate, endDate });

          const gameDateUpdate = new FormData();
          const startTimeStamp = getTime(new Date(values.startDate));
          const endTimeStamp = getTime(new Date(values.endDate));
          if (startTimeStamp && startTimeStamp !== startDate) {
            gameDateUpdate.append('gameStartTimestamp', startTimeStamp);
          }
          if (endTimeStamp && endTimeStamp !== endDate) {
            gameDateUpdate.append('gameEndTimestamp', endTimeStamp);
          }

          console.log({ sd: startTimeStamp, ed: endTimeStamp });
          const data = {
            eventId,
            question: values.question,
            answerOptions: [values.option1, values.option2, values.option3, values.option4],
            correctAnswer: values.answer,
          };

          try {
            if (Array.from(gameDateUpdate.keys()).length > 0) {
              await requests.updateEvent(eventId, gameDateUpdate, user.idToken);
            }
            await requests.addQuestion(user.idToken, data);
            setQuestions([...questions, data]);
            setSubmitting(false);
            resetForm();
          } catch (error) {
            console.log(error);
          }
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
            <Box sx={{ height: 'auto', bgcolor: '#fff', mt: '1rem', borderRadius: '10px', p: 2 }}>
              {questions.map((question, index) => (
                <Box
                  sx={{
                    bgcolor: '#EFEFEF',
                    p: 2,
                    borderRadius: '10px',
                    mb: 1,
                  }}
                  key={Math.random()}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '1.2rem' }}>
                      {question.question}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton>
                        <img src={editIcon} alt="edit" style={{ height: 20, width: 20 }} />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveQuestion(question.uid, index)}>
                        <img src={deleteIcon} alt="edit" style={{ height: 20, width: 20 }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
                    {question.answerOptions.map((option) => (
                      <Box sx={{ bgcolor: '#0BB7CE', borderRadius: '30px', p: 1, width: 186 }} key={Math.random()}>
                        <Typography sx={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>{option}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ height: 'auto', borderRadius: '10px', border: '1px solid #ABABAB', mt: '1rem', p: '1rem' }}>
              <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '1.5rem' }}>Add New Quiz</Typography>
              <Typography sx={{ color: '#000', mb: '2rem' }}>Add quiz and raffle draws for this event</Typography>
              <Field name="question">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Question"
                    fullWidth
                    error={form.errors.question && form.touched.question}
                    helperText={form.errors.question}
                  />
                )}
              </Field>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', gap: '1rem' }}>
                <Field name="option1">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder="Option 1"
                      fullWidth
                      error={form.errors.option1 && form.touched.option1}
                      helperText={form.errors.option1}
                    />
                  )}
                </Field>
                <Field name="option2">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder="Option 2"
                      fullWidth
                      error={form.errors.option2 && form.touched.option2}
                      helperText={form.errors.option2}
                    />
                  )}
                </Field>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', gap: '1rem' }}>
                <Field name="option3">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder="Option 3"
                      fullWidth
                      error={form.errors.option3 && form.touched.option3}
                      helperText={form.errors.option3}
                    />
                  )}
                </Field>
                <Field name="option4">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder="Option 4"
                      fullWidth
                      error={form.errors.option4 && form.touched.option4}
                      helperText={form.errors.option4}
                    />
                  )}
                </Field>
              </Box>
              <Field name="answer">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder="Answer"
                    sx={{ mt: '1rem' }}
                    fullWidth
                    error={form.errors.answer && form.touched.answer}
                    helperText={form.errors.answer}
                  />
                )}
              </Field>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={isSubmitting}
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
                </LoadingButton>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

Quiz.propTypes = {
  startDate: PropTypes.number,
  endDate: PropTypes.number,
};
