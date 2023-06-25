import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ShopLayout } from '@/components/layouts';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { CartList, OrderSummary } from '@/components/cart';
import { CartContext } from '@/context';

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, cart, router]);

  return (
    <ShopLayout
      title='Teslo-Shop - Carrito de compras'
      pageDescription='Carrito de compras de la tienda'
    >
      <>
        {!isLoaded || cart.length === 0 && (
          <>
            <Typography variant='h1' component='h1'>
              Carrito
            </Typography>

            <Grid container>
              <Grid item xs={12} sm={7}>
                <CartList editable />
              </Grid>

              <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                  <CardContent>
                    <Typography variant='h2'>Orden</Typography>
                    <Divider sx={{ my: 1 }} />

                    <OrderSummary />

                    <Box sx={{ mt: 3 }}>
                      <Button
                        color='secondary'
                        className='circular-btn'
                        fullWidth
                      >
                        Checkout
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </>
    </ShopLayout>
  );
};

export default CartPage;
