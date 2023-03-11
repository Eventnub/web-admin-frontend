import PropTypes from 'prop-types';
// @mui
import { InputAdornment } from '@mui/material';
// components
import Iconify from './Iconify';
import InputStyle from './InputStyle';

SearchField.propTypes = {
  query: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func
};

export default function SearchField({ query, onChange, onFocus }) {
  return (
    <InputStyle
      size="small"
      value={query}
      onFocus={onFocus}
      onChange={onChange}
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        ),
      }}
      sx={{ mt: 2, bgcolor: "grey.200" }}
    />
  );
}
