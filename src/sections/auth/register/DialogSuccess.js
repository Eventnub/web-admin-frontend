import PropTypes from 'prop-types';
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import Image from '../../../components/Image';
import MailPhoto from '../../../assets/gifs/mail.gif';

export default function SuccessDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogContent sx={{ bgcolor: 'common.white' }}>
        <Box
          component="form"
          noValidate
          sx={{
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '15px',
          }}
        >
          <Image alt="Mail Photo" loading="lazy" src={MailPhoto} sx={{ width: '200px' }} />
          <DialogTitle sx={{ color: 'primary.main' }}>Registration Successful</DialogTitle>
          <DialogContentText sx={{ textAlign: 'center', mt: 2 }}>
            Account created successfully! A link has been sent to your email address for verification
          </DialogContentText>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

SuccessDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
