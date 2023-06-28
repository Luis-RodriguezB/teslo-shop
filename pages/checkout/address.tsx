import { useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { CartContext } from '@/context';
import { ShopLayout } from '@/components/layouts';
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { countries, jwt } from '@/utils';

type FormData = {
  name: string;
  lastName: string;
  address: string;
  address2: string;
  zipcode: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    name: Cookies.get('name') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zipcode: Cookies.get('zipcode') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || '',
  };
};

const AddressPage = () => {
  const router = useRouter();
  const { updateAddress } = useContext(CartContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  const onSubmit = (formData: FormData) => {
    updateAddress(formData);
    reset();
    router.push('/checkout/summary');
  };
  return (
    <ShopLayout
      title='Dirección'
      pageDescription='Confirmar dirección de destino'
    >
      <Typography variant='h1' component='h1'>
        Dirección
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              type='text'
              label='Nombre*'
              variant='filled'
              fullWidth
              {...register('name', {
                required: 'El campo es requerido',
                minLength: { value: 2, message: 'Agregue un nombre válido' },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type='text'
              label='Apellido*'
              variant='filled'
              fullWidth
              {...register('lastName', {
                required: 'El campo es requerido',
                minLength: { value: 2, message: 'Agregue un apellido válido' },
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type='text'
              label='Dirección*'
              variant='filled'
              fullWidth
              {...register('address', {
                required: 'El campo es requerido',
                minLength: {
                  value: 5,
                  message: 'Agregue una dirección válida',
                },
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type='text'
              label='Dirección 2'
              variant='filled'
              fullWidth
              {...register('address2')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type='text'
              label='Código Postal*'
              variant='filled'
              fullWidth
              {...register('zipcode', {
                required: 'El campo es requerido',
                pattern: {
                  value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                  message: 'Debe de ser un código posta válido',
                },
              })}
              error={!!errors.zipcode}
              helperText={errors.zipcode?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type='text'
              label='Cuidad*'
              variant='filled'
              fullWidth
              {...register('city', {
                required: 'El campo es requerido',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant='filled'
                label='País'
                defaultValue={countries[0].code}
                {...register('country')}
              >
                {countries.map(({ name, code }) => (
                  <MenuItem key={`${code}-${name}`} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Teléfono*'
              variant='filled'
              fullWidth
              {...register('phone', {
                required: 'El campo es requerido',
                pattern: {
                  value: /[0-9]{0,14}$/,
                  message: 'Debe de ser un télefono válido',
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
          <Button
            type='submit'
            color='secondary'
            className='circular-btn'
            size='large'
          >
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = '' } = req.cookies;
  let isValidToken = false;

  try {
    await jwt.isValidToken(token);
    isValidToken = true;
  } catch (error) {
    isValidToken = false;
  }

  if (!isValidToken) {
    return {
      redirect: {
        destination: '/auth/login?p=/checkout/address',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AddressPage;
