import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
import Circle from './Circle';
import Carousel from './Carousel';

const RootStyle = styled(Stack)(({ theme }) => ({
  position: 'fixed',
  right: '0',
  width: '50%',
  minHeight: '100vh',
  backgroundColor: theme.palette.primary.main,
}));

const CarouselStyle = styled(Box)(() => ({
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export default function Onboarder() {
  return (
    <RootStyle>
      <Circle sx={{ height: '72px', width: '72px', position: 'absolute', top: '50px', left: '25px' }} />
      <Circle sx={{ height: '100px', width: '100px', position: 'absolute', top: '40px', right: '25px' }} />
      <Circle sx={{ height: '40px', width: '40px', position: 'absolute', bottom: '30px', left: '100px' }} />
      <Circle sx={{ height: '25px', width: '25px', position: 'absolute', bottom: '200px', right: '35px' }} />
      <CarouselStyle flexGrow={1}>
        <Carousel />
      </CarouselStyle>
    </RootStyle>
  );
}
