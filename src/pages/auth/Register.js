import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Link, Typography } from '@mui/material';
import { PATH_AUTH } from '../../routes/paths';
import Page from '../../components/Page';
import { RegisterForm } from '../../sections/auth/register';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: '100%',
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 3),
  [theme.breakpoints.up('md')]: {
    width: '30%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '35%',
  },
}));

const AuthCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(3),
}));

export default function Register() {
  return (
    <Page title="Register">
      <ContentStyle>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }} gutterBottom>
          SIGN UP
        </Typography>

        <AuthCard>
          <RegisterForm />
          <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
            Already have an account?{' '}
            <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink} underline="none">
              Login
            </Link>
          </Typography>
        </AuthCard>
      </ContentStyle>
    </Page>
  );
}
