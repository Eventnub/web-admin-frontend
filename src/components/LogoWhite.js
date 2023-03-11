import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.any,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();
  const COMMON_WHITE = theme.palette.common.white;

  const logo = (
    <Box sx={{ width: 24, height: 26, display: 'flex', justifyContent: 'center', alignItems: 'center',  ...sx }}>
      <svg width="24" height="26" viewBox="0 0 50 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 26.8218L15 21.8218L33 3.82182C35.1667 2.82182 40.3 1.92182 43.5 6.32182C47.5 11.8218 47.5 16.8218 46 18.8218C44.8 20.4218 34.8333 31.4884 30 36.8218L26 33.3218" stroke={COMMON_WHITE} strokeWidth="5"/>
        <path d="M25 11.3217L18 5.32173C15.3333 3.82173 9.29996 1.72173 6.49996 5.32173C4.16663 7.65508 0.499962 13.6218 4.49996 18.8218C8.49996 24.0218 18.1667 35.6551 22.5 40.8218C24.1667 43.8218 25.4 50.0218 17 50.8218C16 50.6551 13.5 49.5218 11.5 46.3218" stroke={COMMON_WHITE} strokeWidth="5"/>
        <circle cx="7.5" cy="42.3218" r="5" stroke="#00AB55" strokeWidth="3"/>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
