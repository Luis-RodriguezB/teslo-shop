import { Box, Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';

const Custom404 = () => {
  return (
    <ShopLayout
      title='Page not found'
      pageDescription='No hay nada que mostrar aquí'
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Typography variant='h1' component='h1' fontWeight={200} fontSize={90}>
          404 |
        </Typography>
        <Typography fontWeight={500} fontSize={26} marginLeft={2}>
          No se encontró la página
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
