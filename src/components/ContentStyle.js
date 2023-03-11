import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

export const ContentStyle = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  paddingBottom: theme.spacing(6),
  minHeight: "100vh",
  height: "100%"
}));