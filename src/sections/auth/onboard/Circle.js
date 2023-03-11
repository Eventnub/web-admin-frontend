import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export default function Circle({ sx }) {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        opacity: 0.5,
        borderRadius: '50%',
        ...sx,
      }}
    />
  );
}

Circle.propTypes = {
  sx: PropTypes.object,
};
