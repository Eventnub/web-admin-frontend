import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Link, Typography } from '@mui/material';
import { PATH_AUTH } from '../../routes/paths';
import Page from '../../components/Page';
import { LoginForm } from '../../sections/auth/login';

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

export default function Login() {
  return (
    <Page title="Login">
      <ContentStyle>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }} gutterBottom>
          LOGIN
        </Typography>
        <AuthCard>
          <LoginForm />
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 3 }}>
            New here?{' '}
            <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register} underline="none">
              Signup
            </Link>
          </Typography>
        </AuthCard>
      </ContentStyle>
    </Page>
  );
}
