import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// @mui
import { Tooltip, IconButton } from '@mui/material';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

CopyClipboard.propTypes = {
  value: PropTypes.string,
  dark: PropTypes.bool,
};

export default function CopyClipboard({ value, dark = false }) {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    value,
    copied: false,
  });

  const onCopy = () => {
    setState({ ...state, copied: true });
    if (state.value) {
      enqueueSnackbar('Copied!');
    }
  };

  return (
    <CopyToClipboard text={state.value} onCopy={onCopy}>
      <Tooltip title="Copy">
        <IconButton>
          <Iconify icon={'akar-icons:copy'} width={20} height={20} sx={{ color: dark ? 'grey.600' : 'common.white' }} />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );
}
