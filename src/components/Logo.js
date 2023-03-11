import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.any,
};

export default function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', ...sx }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.94 157.36">
        <g fill="#1358a5">
          <path d="M79,0A79,79,0,0,0,37.39,146.12q1.83-10.47,3.14-22A354.85,354.85,0,0,0,41.84,61l3.68-2c-.6,18.68,2,40.12,4.79,63.65,1.33,11.21,3,21.79,5,31.71a77.66,77.66,0,0,0,14,3,319.4,319.4,0,0,0,5-32c2.42-23.38,3.49-46.62,1.93-63.87l3.86-.95c-.6,18.68,1.2,39.81,4,63.34,1.41,11.85,3.23,23,5.33,33.39a78.16,78.16,0,0,0,13.2-2.92c2-9.92,3.66-20.5,5-31.71,2.79-23.53,5.39-45,4.79-63.65l3.67,2a354.94,354.94,0,0,0,1.32,63.09q1.27,11.53,3.14,22A79,79,0,0,0,79,0Zm-31,50.31L50,56.54,43.79,54.4l-5.28,3.9.11-6.56-5.34-3.82L39.56,46l2-6.26,3.77,5.38,6.56,0Zm36.48-.67,1.45,8.5-7.62-4-7.63,4,1.45-8.5-6.17-6,8.53-1.24,3.82-7.73L82,42.39l8.53,1.24Zm34.92,2.1.12,6.56-5.29-3.9-6.21,2.14L110,50.31l-4-5.24,6.57,0,3.76-5.38,2,6.26,6.28,1.92Z" />
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
