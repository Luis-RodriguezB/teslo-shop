import { ShopLayout } from '@/components/layouts';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
import NextLink from 'next/link';

const EmptyPage = () => {
  return (
    <ShopLayout
      title='Carrito Vacio'
      pageDescription='No hay artículos en el carrito de compras'
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        height='calc(100vh - 200px)'
      >
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          marginBottom={5}
        >
          <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
          <Typography fontWeight={600} >Su carrito está vació</Typography>
        </Box>
        <NextLink href='/'>
          <Link typography='h5' color='secondary' component='span'>
            Ir a comprar
          </Link>
        </NextLink>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
