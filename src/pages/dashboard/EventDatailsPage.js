import React, { useState, useEffect } from 'react';
import { Box, Typography, Switch, Stack, Button, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useParams, Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import UserProfile from '../../components/dashboard/UserProfile';
import PageTitle from '../../components/dashboard/PageTitle';
import { requests } from '../../api/requests';
import Engagements from '../../components/dashboard/eventDetails/Engagements';
import RaffleDraw from '../../components/dashboard/eventDetails/RaffleDraw';
import Quiz from '../../components/dashboard/eventDetails/Quiz';
import MusicMatch from '../../components/dashboard/eventDetails/MusicMatch';
import useFirebase from '../../hooks/useFirebase';

const StyledBox = styled(Box)({
  flex: 1,
  background: '#EDF5F6',
  borderRadius: '10px',
  padding: '.8rem 1rem',
  height: '100%',
});

const Number = styled(Typography)({
  color: '#000',
  fontWeight: '700',
  fontSize: '1.7rem',
});

const Text = styled(Typography)({
  color: '#878787',
  fontWeight: '400',
  fontSize: '.9rem',
});

export default function EventDatailsPage() {
  const [event, setEvent] = useState({});
  const [tickets, setTickets] = useState([]);
  const { eventId } = useParams();
  const { date, time } = event;
  const formattedDate = moment(date).format('Do MMM, YYYY').toUpperCase();
  const formattedTime = moment(time, 'HH:mm').format('h:mm A');
  const navigate = useNavigate();
  const { user } = useFirebase();

  useEffect(() => {
    async function fetchEvents() {
      try {
        // setIsLoading(true);
        const { data } = await requests.getEvent(eventId);
        setEvent(data);
        setTickets(data.tickets);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, [eventId]);

  const handleArchive = async () => {
    const formData = new FormData();
    formData.append('isArchived', true);
    try {
      await requests.updateEvent(eventId, formData, user.idToken);
      navigate('/dashboard/archived-events');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{ height: 'auto', width: '100%', pt: '1.5rem', pl: '1.5rem', pr: '1rem', bgcolor: '#F4FAFB', pb: '1.5rem' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <UserProfile />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '1rem' }}>
        <PageTitle title={event.name} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <Typography sx={{ color: '#000', fontSize: '1rem', fontWeight: '500' }}>
            Approve and make visible to public
          </Typography>
          <Switch size="small" />
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: '#fff',
          height: 'auto',
          mt: '1rem',
          borderRadius: '10px',
          p: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: 1.3 }}>
          <img
            src={event.photoUrl}
            alt={event.name}
            style={{
              height: '180px',
              width: { xs: '100%', md: '100%' },
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: '10px',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            px: { xs: '0', md: '2rem' },
          }}
        >
          <Typography
            sx={{
              color: '#515151',
              fontSize: '1rem',
              fontWeight: '400',
              // maxWidth: { xs: '100%', md: '100%' },
            }}
          >
            {event.description}
          </Typography>

          <Box
            sx={{
              mt: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: { xs: '100%', md: '100%' },
            }}
          >
            <Stack>
              <Typography sx={{ color: '#ABABAB', fontWeight: '400', fontSize: '.8rem' }}>Date</Typography>
              <Typography sx={{ color: '#000', fontWeight: '600' }}>{formattedDate}</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ color: '#ABABAB', fontWeight: '400', fontSize: '.8rem' }}>Time</Typography>
              <Typography sx={{ color: '#000', fontWeight: '600' }}>{formattedTime}</Typography>
            </Stack>
          </Box>
          <Box sx={{ mt: '2rem' }}>
            <Typography sx={{ color: '#ABABAB', fontWeight: '400', fontSize: '.8rem' }}>Venue</Typography>
            <Typography sx={{ color: '#000', fontWeight: '400' }}>
              {`${event.venue}, ${event.state}, ${event.country}`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ bgcolor: '#fff', height: 120, mt: '1rem', p: '.8rem', borderRadius: '10px' }}>
        <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '1rem' }}>Tickets</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            mt: '1rem',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          {tickets.map((ticket) => (
            <Stack key={ticket.index}>
              <Typography sx={{ color: '#515151', fontWeight: '600' }}>{ticket.type}</Typography>
              <Typography sx={{ color: '#000', fontWeight: '700' }}>${ticket.price}</Typography>
            </Stack>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          mt: '1rem',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          width: { xs: '100%', md: '100%' },
        }}
      >
        <Button
          variant="outlined"
          component={Link}
          to={`/dashboard/update-event/${eventId}`}
          startIcon={<EditIcon />}
          sx={{ boxShadow: 'none', color: '#0BB7CE', border: '1px solid #0BB7CE' }}
        >
          Edit Event
        </Button>
        <Button
          startIcon={<ArchiveIcon />}
          variant="outlined"
          onClick={handleArchive}
          sx={{ boxShadow: 'none', color: '#FF6C2C', border: '1px solid #FF6C2C' }}
        >
          Send to Archive
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: '1.5rem', mt: '4rem' }}>
        <StyledBox>
          <Number>$8,000</Number>
          <Text>For 100 tickets sold</Text>
        </StyledBox>
        <StyledBox>
          <Number>10k</Number>
          <Text>Impressions</Text>
        </StyledBox>
        <StyledBox>
          <Number>1.5k</Number>
          <Text>Total fans</Text>
        </StyledBox>
      </Box>
      <Engagements />
      <RaffleDraw />
      <Quiz endDate={event.gameEndTimestamp} startDate={event.gameStartTimestamp} />
      <MusicMatch />
    </Box>
  );
}
