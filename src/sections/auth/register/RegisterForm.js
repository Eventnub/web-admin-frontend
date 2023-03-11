import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, Box, InputAdornment, Alert, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import useFirebase from '../../../hooks/useFirebase';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Iconify from '../../../components/Iconify';
import InputStyle from '../../../components/InputStyle';
import DialogSuccess from './DialogSuccess';

export default function RegisterForm() {
  const { register } = useFirebase();

  const isMountedRef = useIsMountedRef();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dialogShown, setDialogShown] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      values = { ...values, phoneNumber };
      try {
        await register(values.email, values.password, values.firstName, values.lastName, values.phoneNumber);
        if (isMountedRef.current) {
          setSubmitting(false);
          handleOpenDialog();
          resetForm();
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }

        console.error(error);
      }
    },
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleOnPhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const handleOpenDialog = () => {
    setDialogShown(true);
  };

  const handleCloseDialog = () => {
    setDialogShown(false);
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const { onChange } = getFieldProps('email');
  const emailFieldProps = {
    ...getFieldProps('email'),
    onChange: (e) => {
      e.target.value = e.target.value.trim();
      onChange(e);
    },
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="body2">First Name</Typography>
            <InputStyle
              fullWidth
              size="large"
              placeholder="Enter your first name"
              {...getFieldProps('firstName')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:person-outline" sx={{ color: 'text.disabled', width: 24, height: 24 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 1 }}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Box>

          <Box>
            <Typography variant="body2">Last Name</Typography>
            <InputStyle
              fullWidth
              size="large"
              placeholder="Enter your last name"
              {...getFieldProps('lastName')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:person-outline" sx={{ color: 'text.disabled', width: 24, height: 24 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 1 }}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Box>

          <Box>
            <Typography variant="body2">Email</Typography>
            <InputStyle
              fullWidth
              size="large"
              placeholder="What's your email address"
              {...emailFieldProps}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:email-outline" sx={{ color: 'text.disabled', width: 24, height: 24 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 1 }}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Box>

          <Box>
            <Typography variant="body2">Phone Number</Typography>
            <PhoneInput
              inputStyle={{
                width: '100%',
              }}
              enableSearch="true"
              disableSearchIcon="true"
              searchPlaceholder="search countries"
              specialLabel=""
              searchStyle={{
                width: '95%',
                padding: '8px',
                marginBottom: '2px',
              }}
              country={'us'}
              value={phoneNumber}
              onChange={handleOnPhoneChange}
            />
          </Box>

          <Box>
            <Typography variant="body2">Password</Typography>
            <InputStyle
              fullWidth
              size="large"
              type={showPassword ? 'text' : 'password'}
              placeholder="Choose a password"
              {...getFieldProps('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:lock-outline" sx={{ color: 'text.disabled', width: 24, height: 24 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment onClick={handleShowPassword} position="end" sx={{ cursor: 'pointer' }}>
                    <Typography variant="caption" sx={{ color: 'grey.500' }}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Typography>
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 1 }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Box>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Register
          </LoadingButton>

          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
        </Stack>
      </Form>
      <DialogSuccess open={dialogShown} handleClose={handleCloseDialog} />
    </FormikProvider>
  );
}
