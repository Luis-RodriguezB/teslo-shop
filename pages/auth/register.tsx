import { useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { AuthLayout } from '@/components/layouts';
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
import { AuthContext } from '@/context';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const [showError, setShowError] = useState<{ hasError: boolean; message?: string }>({ hasError: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const { name, email, password } = formData;
    setShowError({ hasError: false });

    const { hasError, message } = await registerUser(name, email, password);
    
    if(hasError) {
      setShowError({
        ...showError,
        hasError,
        message
      });
      setTimeout(() => setShowError({ hasError: false }), 3000);
      return;
    }

    // router.replace('/');
    await signIn('credentials', { email, password });
    reset();
  };

  return (
    <AuthLayout title='Registro'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1' textAlign='center'>
                Crear cuenta
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Nombre completo'
                variant='filled'
                type='text'
                fullWidth
                {...register('name', {
                  required: 'El nombre es requerido',
                  minLength: {
                    value: 2,
                    message: 'Debe de ser un nombre valido',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Correo'
                variant='filled'
                type='email'
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
                label='Contraseña'
                variant='filled'
                type='password'
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
              {showError.hasError && (
                <Chip
                  label={showError.message}
                  color='error'
                  icon={<ErrorOutline />}
                  sx={{ mb: 2 }}
                  className='fadeIn'
                />
              )}

              <Button
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
                type='submit'
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='center'>
              <NextLink href={ router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login' }>
                <Link component='span' underline='always'>
                  ¿Ya tienes cuenta?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });
  const { p = '/' } = query;

  if(session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      }
    }
  }

  return {
    props: {
      
    }
  }
}

export default RegisterPage;
