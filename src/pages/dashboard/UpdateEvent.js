import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import path from 'path';
import { TextField, Typography, Box, Button, styled, IconButton, Stack, InputAdornment } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
// import google from '../../assets/Google-drive.png';
import storage from '../../assets/storage.png';
// import cloud from '../../assets/Cloud-upload.png';
import { requests } from '../../api/requests';
import useFirebase from '../../hooks/useFirebase';
import UserProfile from '../../components/dashboard/UserProfile';
import PageTitle from '../../components/dashboard/PageTitle';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid #323232',
      borderRadius: '5px',
    },
  },
});

export default function CreateEvent() {
  const [image, setImage] = useState(null);
  const [event, setEvent] = useState({});
  const [artists, setArtists] = useState([]);
  const [currentArtist, setCurrentArtist] = useState('');
  const [tickets, setTickets] = useState([]);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [currentTicket, setCurrentTicket] = useState({
    type: '',
    price: '',
    description: '',
  });
  const { eventId } = useParams();
  const imageRef = useRef(null);
  const { user } = useFirebase();
  const navigate = useNavigate();

  const photoRef = useRef(null);

  const handleSelectImage = () => {
    imageRef.current.click();
  };

  const handleAddArtist = () => {
    setArtists((prevArtists) => [...prevArtists, currentArtist]);
    setCurrentArtist('');
  };

  const handleRemoveArtist = (_index) => {
    setArtists((prevArtists) => prevArtists.filter((artist, index) => index !== _index));
  };

  const handleRemoveTicket = (_index) => {
    setTickets((prevTickets) => prevTickets.filter((ticket, index) => index !== _index));
  };

  const handleAddTicket = () => {
    if (!currentTicket.type || !currentTicket.price || !currentTicket.description) {
      return null;
    }
    setTickets((prevTickets) => [...prevTickets, currentTicket]);
    setCurrentTicket({
      type: '',
      price: '',
      description: '',
    });
    return null;
  };

  const handleImageChange = async (e) => {
    if (!e.target.files.length) return null;
    const file = e.target.files[0];
    const fileExtension = path.extname(file.name);
    if (!['.jpg', '.jpeg', '.png'].includes(fileExtension.toLowerCase())) {
      window.alert(`Unsupported file format: ${fileExtension}`);
      return null;
    }
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // eslint-disable-next-line
    reader.onload = function (event) {
      photoRef.current.style.backgroundImage = `url(${event.target.result})`;
    };

    return null;
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data } = await requests.getEvent(eventId);
        setEvent(data);
        setArtists(data.artists);
        setTickets(data.tickets);
        setCountry(data.country);
        setState(data.state);
        photoRef.current.style.backgroundImage = `url(${data.photoUrl})`;
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, [eventId]);

  return (
    <Box sx={{ pt: 3, pl: 1, pr: 2, bgcolor: '#F4FAFB', height: '100%', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <PageTitle title="Edit Event" />
        <UserProfile />
      </Box>
      <Box sx={{ mt: '2%', mb: '2rem' }}>
        <Box sx={{ width: '100%' }}>
          <Formik
            initialValues={{
              eventName: event.name || '',
              host: event.host || '',
              eventDate: event.date || '',
              time: event.time || '',
              venue: event.venue || '',
              eventDescription: event.description || '',
            }}
            enableReinitialize
            validationSchema={Yup.object({
              eventName: Yup.string().min(2, 'Too short!').max(50, 'Too Long!').required('Event name required'),
              host: Yup.string().min(2, 'Too short!').max(50, 'Too Long!').required('Host required'),
              eventDate: Yup.date()
                .required('Date of event is required')
                .min(new Date(), 'Date must be after today')
                .required('Event date is required'),
              time: Yup.string().required('Time is required'),
              eventDescription: Yup.string().required('Event details is required'),
              venue: Yup.string().required('Venue is required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              const { eventName, host, eventDate, eventDescription, venue, time } = values;
              const formData = new FormData();
              formData.append('name', eventName);
              formData.append('host', host);
              formData.append('description', eventDescription);
              formData.append('date', eventDate);
              formData.append('time', time);
              formData.append('venue', venue);
              formData.append('country', country);
              formData.append('state', state);
              formData.append('type', 'Paid');
              if (image !== null) {
                formData.append('photo', image);
              }
              artists.forEach((artist, index) => {
                formData.append(`artists[${index}]`, artist);
              });
              tickets.forEach((ticket, index) => {
                formData.append(`tickets[${index}][type]`, ticket.type);
                formData.append(`tickets[${index}][price]`, ticket.price);
                formData.append(`tickets[${index}][description]`, ticket.description);
              });
              try {
                await requests.updateEvent(eventId, formData, user.idToken);
                setSubmitting(false);
                navigate('/dashboard/home');
              } catch (error) {
                console.log(error.request.responseText);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="off">
                <Field name="eventName">
                  {({ field, form }) => (
                    <StyledTextField
                      {...field}
                      variant="outlined"
                      placeholder="Event Name"
                      fullWidth
                      error={form.errors.eventName && form.touched.eventName}
                      helperText={form.errors.eventName}
                    />
                  )}
                </Field>
                <Box sx={{ display: 'flex', height: '250px', mt: '1rem', gap: '1rem' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      flex: '1',
                      border: '1px solid #A8A8A8',
                      py: '4rem',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    <div
                      ref={photoRef}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: "url('')",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div>
                      <Typography textAlign="center">Upload Event Image</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Stack>
                          <IconButton onClick={handleSelectImage}>
                            <img src={storage} alt="local storage" style={{ height: '57px', width: '57px' }} />
                          </IconButton>
                          <Typography textAlign="center">Storage</Typography>
                        </Stack>
                        {/* <Stack>
                        <IconButton>
                          <img src={google} alt="google drive" />
                        </IconButton>
                        <Typography textAlign="center">Drive</Typography>
                      </Stack>
                      <Stack>
                        <IconButton>
                          <img src={cloud} alt="drop box" />
                        </IconButton>
                        <Typography textAlign="center">Drop Box</Typography>
                      </Stack> */}
                        <input type="file" style={{ display: 'none' }} ref={imageRef} onChange={handleImageChange} />
                      </Box>
                    </div>
                  </Box>
                  <Box
                    sx={{
                      flex: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Field name="host">
                      {({ field, form }) => (
                        <StyledTextField
                          {...field}
                          variant="outlined"
                          placeholder="Host"
                          fullWidth
                          error={form.errors.host && form.touched.host}
                          helperText={form.errors.host}
                        />
                      )}
                    </Field>
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                      <Field name="eventDate">
                        {({ field, form }) => (
                          <StyledTextField
                            {...field}
                            variant="outlined"
                            placeholder="Event Date"
                            type="date"
                            fullWidth
                            error={form.errors.eventDate && form.touched.eventDate}
                            helperText={form.errors.eventDate}
                          />
                        )}
                      </Field>
                      <Field name="time">
                        {({ field, form }) => (
                          <StyledTextField
                            {...field}
                            variant="outlined"
                            placeholder="Time"
                            type="time"
                            fullWidth
                            error={form.errors.time && form.touched.time}
                            helperText={form.errors.time}
                          />
                        )}
                      </Field>
                    </Box>
                    <Field name="venue">
                      {({ field, form }) => (
                        <StyledTextField
                          {...field}
                          variant="outlined"
                          placeholder="Venu/Location"
                          fullWidth
                          error={form.errors.venue && form.touched.venue}
                          helperText={form.errors.venue}
                        />
                      )}
                    </Field>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: '1rem',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <CountryDropdown
                    value={country}
                    onChange={(val) => setCountry(val)}
                    style={{ flex: 1, height: '56px', background: '#F4FAFB', borderRadius: '4px' }}
                  />
                  <RegionDropdown
                    country={country}
                    value={state}
                    onChange={(val) => setState(val)}
                    style={{ flex: 1, height: '56px', background: '#F4FAFB', borderRadius: '4px' }}
                  />
                </Box>
                <Field name="eventDescription">
                  {({ field, form }) => (
                    <StyledTextField
                      {...field}
                      variant="outlined"
                      placeholder="Event Description"
                      fullWidth
                      multiline
                      rows={6}
                      error={form.errors.eventDescription && form.touched.eventDescription}
                      helperText={form.errors.eventDescription}
                      sx={{ mt: '1rem' }}
                    />
                  )}
                </Field>
                <Typography sx={{ color: '#ABABAB', fontSize: '.8rem' }}>
                  Give a description about what you want your fans to know about this event
                </Typography>
                <Box
                  sx={{
                    height: 'auto',
                    background: '#F9FEFF',
                    mt: '3rem',
                    px: '1rem',
                    py: '1.5rem',
                    borderRadius: '10px',
                    // position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography sx={{ color: '#525252', fontWeight: '600', fontSize: '1.5rem' }}>
                    Add Featured Artists
                  </Typography>
                  <Typography sx={{ color: '#ABABAB', fontWeight: '400', fontSize: '1rem' }}>
                    Add the featured artists for this event
                  </Typography>
                  <Box
                    sx={{ height: 'auto', border: '1px solid #D1D0D0', borderRadius: '8px', mt: '1.5rem', p: '1rem' }}
                  >
                    {artists.length <= 0 ? (
                      <Typography textAlign="center">No artist added yet</Typography>
                    ) : (
                      <>
                        {artists.map((artist, index) => (
                          <Stack
                            direction="row"
                            sx={{
                              justifyContent: 'space-between',
                              background: '#E3E3E3',
                              borderRadius: '10px',
                              mb: '2px',
                              p: '5px',
                            }}
                            key={index}
                          >
                            <Typography
                              sx={{ color: '#000', fontWeight: '400', fontSize: '1rem', textAlign: 'center' }}
                            >
                              {artist}
                            </Typography>
                            <IconButton onClick={() => handleRemoveArtist(index)}>
                              <CancelIcon />
                            </IconButton>
                          </Stack>
                        ))}
                      </>
                    )}
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      mt: '1rem',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <StyledTextField
                        variant="outlined"
                        placeholder="Artist Name"
                        value={currentArtist}
                        onChange={(e) => {
                          setCurrentArtist(e.target.value);
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { height: '3rem' } }}
                      />
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddArtist}
                        sx={{ background: '#FF6C2C', boxShadow: 'none', width: '50%', height: '3rem' }}
                      >
                        Add Artist
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: '2rem',
                    background: '#F9FEFF',
                    height: 'auto',
                    borderRadius: '10px',
                    px: '1.5rem',
                    py: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography sx={{ color: '#525252', fontWeight: '600', fontSize: '1.5rem' }}>
                    Add Tickets For This Concert (Optional)
                  </Typography>
                  <Typography sx={{ color: '#ABABAB', fontWeight: '400', fontSize: '1rem' }}>
                    Add the available tickets for this concert and their prices respectively
                  </Typography>
                  <Box
                    sx={{ border: '1px solid #D1D0D0', height: 'auto', borderRadius: '10px', mt: '2rem', p: '1rem' }}
                  >
                    {tickets.length <= 0 ? (
                      <Typography textAlign="center">No ticket added yet</Typography>
                    ) : (
                      <>
                        {tickets.map((ticket, index) => (
                          <Stack
                            direction="row"
                            sx={{
                              justifyContent: 'space-between',
                              background: '#E3E3E3',
                              borderRadius: '10px',
                              mb: '2px',
                              p: '5px',
                            }}
                            key={index}
                          >
                            <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '1rem', flex: 1 }}>
                              {ticket.type}
                            </Typography>
                            <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '1rem', flex: 1 }}>
                              {ticket.price}
                            </Typography>
                            <IconButton onClick={() => handleRemoveTicket(index)}>
                              <CancelIcon />
                            </IconButton>
                          </Stack>
                        ))}
                      </>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', mt: '1rem', gap: '1rem' }}>
                    <StyledTextField
                      variant="outlined"
                      placeholder="Ticket Type"
                      fullWidth
                      value={currentTicket.type}
                      onChange={(e) => setCurrentTicket((p) => ({ ...p, type: e.target.value }))}
                    />
                    <StyledTextField
                      variant="outlined"
                      placeholder="Price"
                      type="number"
                      value={currentTicket.price}
                      onChange={(e) => setCurrentTicket((p) => ({ ...p, price: e.target.value }))}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: 'grey.500',
                                fontWeight: '300',
                                mr: '0.5rem',
                              }}
                            >
                              USD
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <StyledTextField
                    variant="outlined"
                    placeholder="Seat Map URL"
                    value={currentTicket.description}
                    onChange={(e) => setCurrentTicket((p) => ({ ...p, description: e.target.value }))}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mt: '1rem' }}
                  />
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddTicket}
                    sx={{
                      background: '#FF6C2C',
                      boxShadow: 'none',
                      width: '20%',
                      height: '10%',
                      mt: '1rem',
                      borderRadius: '10px',
                      alignSelf: 'flex-end',
                    }}
                  >
                    Add Ticket
                  </Button>
                </Box>
                <LoadingButton
                  variant="contained"
                  fullWidth
                  type="submit"
                  loading={isSubmitting}
                  sx={{ boxShadow: 'none', mt: '2rem', background: '#1358A5', height: '47px' }}
                >
                  Update Event
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}
