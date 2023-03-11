// @mui
import { Stack, Button, Typography } from '@mui/material';
// hooks
import useFirebase from '../../../hooks/useFirebase';
//
import Iconify from '../../../components/Iconify';

export default function LogoutButton() {
  const { logout } = useFirebase();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack spacing={3} sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}>
      <Button
        size="large"
        variant="outlined"
        color="error"
        startIcon={<Iconify icon="majesticons:logout" />}
        onClick={handleLogout}
        sx={{ border: 'none', '&:hover': { border: 'none' } }}
      >
        <Typography variant="body2">Logout</Typography>
      </Button>
    </Stack>
  );
}
