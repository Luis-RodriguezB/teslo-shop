import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  getSession,
  signIn,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthLayout } from '@/components/layouts';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Chip,
  Divider,
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { validations } from '@/utils';
import { BuiltInProviderType } from 'next-auth/providers';

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    setShowError(false);
    // const isValidLogin = await loginUser(email, password);

    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => setShowError(false), 3000);
    //   return;
    // }

    // const destination = router.query.p?.toString() || '/';
    // router.replace(destination);
    await signIn('credentials', {
      email,
      password,
    });
    reset();
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

            <Grid
              item
              xs={12}
              display='flex'
              flexDirection='column'
              justifyContent='center'
            >
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : '/auth/register'
                }
              >
                <Link component='span' underline='always'>
                  ¿No tienes cuenta?
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
              <Divider sx={{ width: '100%', mb: 2 }} />
              {providers &&
                Object.values(providers).map((provider) => {
                  if(provider.id === 'credentials') return (<div key='credentials'></div>)

                  return (
                    <Button
                      key={provider.id}
                      variant='outlined'
                      fullWidth
                      color='primary'
                      sx={{ mb: 1 }}
                      onClick={() => signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  );
                })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { p = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
