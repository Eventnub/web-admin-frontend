import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack, Button, Card, Link, Divider, Typography, Box, Avatar } from '@mui/material';
import { PATH_AUTH } from '../../routes/paths';
import useFirebase from '../../hooks/useFirebase';
import Page from '../../components/Page';
import GoogleIcon from '../../assets/images/auth/google.png';
import FacebookIcon from '../../assets/images/auth/facebook.png';

const buttonStyle = {
  color: 'grey.500',
  fontWeight: 'fontWeightRegular',
};

const iconStyle = {
  width: 20,
  height: 20,
};

const ContentStyle = styled('div')(({ theme }) => ({
  height: '100%',
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 3),
  [theme.breakpoints.up('md')]: {
    width: '35%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '30%',
  },
}));

const AuthCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(3),
}));

export default function Auth() {
  const { loginWithGoogle, loginWithFacebook } = useFirebase();

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginFacebook = async () => {
    try {
      await loginWithFacebook();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Auth">
      <Box>
        <ContentStyle>
          <AuthCard>
            <Typography variant="subtitle1" sx={{ mb: 5 }}>
              Withdraw cash from crypto
            </Typography>

            <Stack direction="column" spacing={2}>
              <Button
                size="large"
                variant="outlined"
                sx={buttonStyle}
                startIcon={<Avatar src={GoogleIcon} sx={iconStyle} />}
                onClick={handleLoginGoogle}
              >
                Sign Up with Google
              </Button>
              <Button
                size="large"
                variant="outlined"
                sx={buttonStyle}
                startIcon={<Avatar src={FacebookIcon} sx={iconStyle} />}
                onClick={handleLoginFacebook}
              >
                Sign Up with Facebook
              </Button>
            </Stack>

            <Divider sx={{ my: 4 }}>
              <Typography variant="body2" sx={{ color: 'grey.600' }}>
                OR
              </Typography>
            </Divider>

            <Button fullWidth size="large" variant="contained" href={PATH_AUTH.register}>
              Sign up with email
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have an account?{' '}
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login} underline="none">
                Login
              </Link>
            </Typography>
          </AuthCard>
        </ContentStyle>
      </Box>
    </Page>
  );
}
