import NextLink from 'next/link';
import { AuthLayout } from '@/components/layouts';
import { Box, Button, Grid, TextField, Typography, Link } from '@mui/material';

const LoginPage = () => {
  return (
    <AuthLayout title='Iniciar Sesión'>
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1' textAlign='center'>
              Iniciar Sesión
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Correo' variant='filled' fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField label='Contraseña' variant='filled' fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Button
              color='secondary'
              className='circular-btn'
              size='large'
              fullWidth
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
    </AuthLayout>
  );
};

export default LoginPage;
