import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function PageTitle({ title }) {
  return <Typography sx={{ color: '#000', fontWeight: 500, fontSize: '2.5rem' }}>{title}</Typography>;
}

PageTitle.propTypes = {
  title: PropTypes.string,
};
