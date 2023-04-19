import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export default function Engagements() {
  const data = [
    { game: 'Quiz', won: 20, lost: 31, totalPlay: 51 },
    { game: 'Raffle Draw', won: 120, lost: 20, totalPlay: 140 },
    { game: 'Play the Beat', won: 40, lost: 42, totalPlay: 82 },
  ];
  return (
    <Box sx={{ mt: '3rem', p: { xs: 0, md: '1rem' }, bgcolor: '#fff', borderRadius: '10px' }}>
      <Typography sx={{ color: '#000', fontWeight: '700', fontSize: '1.6rem' }}>Engagements</Typography>
      <Box
        sx={{
          display: 'flex',
          mt: '2rem',
          gap: { xs: '3rem', md: '8rem' },
          width: { xs: '100%', md: '100%' },
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: 'space-between',
        }}
      >
        <Stack>
          <Typography sx={{ color: '#515151', fontWeight: '600' }}>Total Views</Typography>
          <Typography sx={{ color: '#000', fontWeight: '700' }}>15,456</Typography>
        </Stack>
        <Stack>
          <Typography sx={{ color: '#515151', fontWeight: '600' }}>Total tickets sold</Typography>
          <Typography sx={{ color: '#000', fontWeight: '700' }}>145</Typography>
        </Stack>
        <Stack>
          <Typography sx={{ color: '#515151', fontWeight: '600' }}>Total tickets won</Typography>
          <Typography sx={{ color: '#000', fontWeight: '700' }}>50</Typography>
        </Stack>
      </Box>
      <Box sx={{ mt: '2rem' }}>
        <Typography sx={{ color: '#000', fontWeight: '700', fontSize: '1.3rem' }}>Game activities</Typography>
        <TableContainer sx={{ mt: '2rem' }}>
          <Table>
            <TableHead sx={{ background: '#F5F5F5' }}>
              <TableRow>
                <TableCell>Game</TableCell>
                <TableCell>Won</TableCell>
                <TableCell>Lost</TableCell>
                <TableCell>Total Play</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.game}</TableCell>
                  <TableCell>{row.won}</TableCell>
                  <TableCell>{row.lost}</TableCell>
                  <TableCell>{row.totalPlay}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
