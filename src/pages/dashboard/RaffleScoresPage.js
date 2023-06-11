import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PreviousButton from '../../components/dashboard/PreviousButton';
import UserProfile from '../../components/dashboard/UserProfile';
import RaffleDrawsTable from '../../components/dashboard/manageGames/RaffleDrawsTable';
import useFirebase from '../../hooks/useFirebase';
import { requests } from '../../api/requests';

const RaffleNumber = styled(Typography)({
  color: '#000',
  fontWeight: '700',
  fontSize: '.6rem',
  textAlign: 'center',
});

const StyledBox = styled(Box)({
  background: '#EDF5F6',
  borderRadius: '10px',
  padding: '.8rem 1rem',
  height: '100%',
  width: '18%',
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

export default function RaffleScoresPage() {
  const { eventId } = useParams();
  const { user } = useFirebase();
  const [showNumbers, setShowNumbers] = useState(false);
  const [raffleDrawResults, setRaffleDrawResults] = useState([]);
  const [raffleDrawStatistics, setRaffleDrawStatistics] = useState({});
  const [raffleNumbers, setRaffleNumbers] = useState([]);
  const [event, setEvent] = useState({});
  const { totalTakes, totalPasses, totalFailures } = raffleDrawStatistics;
  const formattedTotalTakes = totalTakes < 10 ? `0${totalTakes}` : totalTakes;
  const formattedTotalPasses = totalPasses < 10 ? `0${totalPasses}` : totalPasses;
  const formattedTotalFailures = totalPasses < 10 ? `0${totalFailures}` : totalFailures;

  const handleToggleNumbers = () => {
    setShowNumbers((prevShowNumbers) => !prevShowNumbers);
  };

  useEffect(() => {
    async function getEventRaffleDrawResults() {
      try {
        const { data } = await requests.getEventRaffleDrawResults(eventId, user.idToken);
        setRaffleDrawResults(data.results);
        setRaffleDrawStatistics(data.statistics);
      } catch (error) {
        console.log(error);
      }
    }
    getEventRaffleDrawResults();
  }, [user.idToken, eventId]);

  useEffect(() => {
    async function fetchEvent() {
      try {
        // setIsLoading(true);
        const { data } = await requests.getEvent(eventId);
        setEvent(data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    async function fetchEventRaffleDraw() {
      try {
        // setIsLoading(true);
        const { data } = await requests.getEventRaffleDraw(eventId, user.idToken);
        setRaffleNumbers(data.chosenNumbers);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEventRaffleDraw();
  }, [eventId, user.idToken]);

  return (
    <Box sx={{ bgcolor: '#F4FAFB', height: '100%', width: '100%', pt: 3, pl: 1, pr: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <PreviousButton />
        <UserProfile />
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography sx={{ textTransform: 'capitalize', color: '#909090', fontWeight: '400', fontSize: '1rem' }}>
            {event.name}
          </Typography>
          <Typography sx={{ color: '#000', fontWeight: 500, fontSize: '2.2rem' }}>Raffle Scores</Typography>
        </Box>
        <Box sx={{ width: '20%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '.8rem' }}>Lucky Numbers</Typography>
            <IconButton onClick={handleToggleNumbers}>
              {showNumbers ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {raffleNumbers.map((number) => (
              <Box
                sx={{
                  height: '27px',
                  width: '26px',
                  bgcolor: '#E3E3E3',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={Math.random()}
              >
                {showNumbers ? (
                  <RaffleNumber>{number}</RaffleNumber>
                ) : (
                  <RaffleNumber sx={{ fontSize: '1.2rem' }}>*</RaffleNumber>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
        <StyledBox>
          <Number>{formattedTotalTakes}</Number>
          <Text>Total Draws</Text>
        </StyledBox>
        <StyledBox>
          <Number>{formattedTotalPasses}</Number>
          <Text>Correct Draws</Text>
        </StyledBox>
        <StyledBox>
          <Number>{formattedTotalFailures}</Number>
          <Text>Failed Draws</Text>
        </StyledBox>
      </Box>
      <RaffleDrawsTable raffleDrawResults={raffleDrawResults} />
    </Box>
  );
}
