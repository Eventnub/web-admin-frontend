// @mui
import { Stack, Button, Typography } from '@mui/material';
// hooks
import useFirebase from '../../../hooks/useFirebase';
//

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
        onClick={handleLogout}
        sx={{ border: 'none', '&:hover': { border: 'none' } }}
      >
        <Typography sx={{ color: '#000', fontWeight: '600' }}>Logout</Typography>
      </Button>
    </Stack>
  );
}
