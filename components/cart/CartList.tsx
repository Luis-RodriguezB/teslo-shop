import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { CartContext } from '@/context';
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { ItemCounter } from '../ui';

import { getNumberFormat } from '@/utils';
import { ICartProduct } from '@/interfaces';

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateCartQuantity, deleteProductInCart } = useContext(CartContext);

  const onNewCartQuantityValue = (product: ICartProduct, value: number) => {
    product.quantity = value;

    updateCartQuantity(product);
  };

  const onDeleteProductInCart = (product: ICartProduct) => {
    deleteProductInCart(product);
  };

  return (
    <>
      {cart.map((product) => (
        <Grid
          container
          padding={2}
          key={`${product.slug}__${product.size}`}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`}>
              <CardActionArea>
                <CardMedia
                  image={`/products/${product.image}`}
                  component='img'
                  sx={{ borderRadius: '5px' }}
                />
              </CardActionArea>
            </NextLink>
          </Grid>

          <Grid item xs={7} paddingX={1}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Talla: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  inStock={10}
                  currentQuantity={product.quantity}
                  updatedQuantity={(value) =>
                    onNewCartQuantityValue(product, value)
                  }
                />
              ) : (
                <Typography variant='h6'>
                  {product.quantity}
                  {product.quantity === 1 ? 'producto' : 'productos'}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={2}
            display='flex'
            alignItems='center'
            flexDirection='column'
          >
            <Typography variant='subtitle1'>
              {getNumberFormat(product.price, {
                format: 'en',
                style: 'currency',
                currency: 'USD',
              })}
            </Typography>

            {editable && (
              <Button
                variant='text'
                color='secondary'
                onClick={() => onDeleteProductInCart(product)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
