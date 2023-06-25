import { useState } from 'react';
import NextLink from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthLayout } from '@/components/layouts';
import { tesloApi } from '@/api';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Chip,
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { validations } from '@/utils';

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    setShowError(false);
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      console.log('Error en las credenciales');
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <AuthLayout title='Iniciar Sesión'>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1' textAlign='center'>
                Iniciar Sesión
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='email'
                label='Correo'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'El correo es requerido',
                  validate: (value) => validations.isEmail(value),
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='password'
                label='Contraseña'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe de ser mínimo de 6 caracteres',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid
              item
              xs={12}
              display='flex'
              justifyContent='center'
              alignItems='center'
              flexDirection='column'
            >
              {showError && (
                <Chip
                  label='No reconocemos ese usuario/contraseña'
                  color='error'
                  icon={<ErrorOutline />}
                  sx={{ mb: 2 }}
                  className='fadeIn'
                />
              )}

              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
                disabled={showError}
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='center'>
              <NextLink href='/auth/register'>
                <Link component='span' underline='always'>
                  ¿No tienes centa?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
