import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Alert, Typography, InputAdornment, Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Person, LockOpen } from '@mui/icons-material';
import useFirebase from '../../../hooks/useFirebase';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

export default function LoginForm() {
  const { login } = useFirebase();
  const isMountedRef = useIsMountedRef();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await login(values.email, values.password);
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

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
        <Box sx={{ diplay: 'flex', flexDirection: 'column' }}>
          <Box display="flex" alignItems={'stretch'}>
            <Box sx={{ display: 'flex', bgcolor: '#1358A5', alignItems: 'center', px: 1 }}>
              <Person sx={{ color: '#fff' }} />
            </Box>
            <TextField
              placeholder="Email"
              variant="outlined"
              fullWidth
              size="small"
              {...emailFieldProps}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              InputProps={{
                sx: {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              }}
            />
          </Box>
          <Box display="flex" mt={3}>
            <Box sx={{ display: 'flex', bgcolor: '#1358A5', alignItems: 'center', px: 1 }}>
              <LockOpen sx={{ color: '#fff' }} />
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Password"
              size="small"
              type={showPassword ? 'text' : 'password'}
              {...getFieldProps('password')}
              InputProps={{
                sx: {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
                endAdornment: (
                  <InputAdornment onClick={handleShowPassword} position="end" sx={{ cursor: 'pointer' }}>
                    <Typography variant="caption" sx={{ color: 'grey.500' }}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Typography>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={!(formik.isValid && formik.dirty)}
              sx={{ boxShadow: 'none', bgcolor: '#1358A5', width: '35%', borderRadius: '5px', height: '50px' }}
            >
              Login
            </LoadingButton>
          </Box>
        </Box>

        {errors.afterSubmit && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {errors.afterSubmit}
          </Alert>
        )}
      </Form>
    </FormikProvider>
  );
}
