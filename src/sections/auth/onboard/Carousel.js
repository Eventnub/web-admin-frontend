import Slider from 'react-slick';
import { useRef } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';
import Image from '../../../components/Image';
import { CarouselDots } from '../../../components/carousel';
import image1 from '../../../assets/images/1.png';
import image2 from '../../../assets/images/2.png';
import image3 from '../../../assets/images/3.png';

const CAROUSEL_ITEMS = [
  {
    id: 1,
    image: image1,
    title: 'The Best Doctors At Your Fingertips',
    content: 'Find the best Doctors to get instant medical advice and second opinion for your health problems',
  },
  {
    id: 2,
    image: image1,
    title: 'Online Consultation via Video/ Audio Call',
    content: 'Consult with the world’s top specialist doctors in any country from the comfort of your home',
  },
  {
    id: 3,
    image: image2,
    title: 'Live Medical Reports from Experts',
    content: 'Consult with the world’s top specialist doctors in any country from the comfort of your home',
  },
  {
    id: 4,
    image: image3,
    title: 'Instant E-Prescriptions',
    content:
      'Get instant E-prescriptions from anywhere and get your prescriptions and medications delivered to you right at your food step',
  },
];

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& .slick-list': {
    boxShadow: theme.customShadows.z16,
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
}));

const CarouselItemStyle = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& .MuiTypography-root': {
    textAlign: 'center',
    color: theme.palette.common.white,
  },
}));

export default function Carousel() {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      rounded: true,
      sx: { mt: 3 },
    }),
  };

  return (
    <RootStyle>
      <Slider ref={carouselRef} {...settings}>
        {CAROUSEL_ITEMS.map((item) => (
          <CarouselItemStyle key={item.id} direction="column">
            <Image alt={item.title} src={item.image} sx={{ width: { md: '80%', xl: '60%' }, margin: '0 auto' }} />
            <Typography variant="h4" sx={{ mt: 2, mb: 2, pl: 5, pr: 5 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ pl: 10, pr: 10 }}>
              {item.content}
            </Typography>
          </CarouselItemStyle>
        ))}
      </Slider>
    </RootStyle>
  );
}
