import React from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 2px',
        display: 'flex',
        alignItems: 'center',
        width: 271,
        border: '1px solid #B8B8B8',
        borderRadius: '10px',
        bgcolor: 'rgba(248, 248, 248, 0.25)',
      }}
    >
      <IconButton sx={{ p: '10px' }} size="small">
        <SearchIcon />
      </IconButton>
      <InputBase sx={{ ml: 0.5, flex: 1 }} placeholder="Search" />
    </Paper>
  );
}
