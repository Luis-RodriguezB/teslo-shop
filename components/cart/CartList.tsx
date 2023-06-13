import { FC } from 'react';
import NextLink from 'next/link';
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

import { initialData } from '@/database/products';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container padding={2} key={product.slug} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href='/product/slug'>
              <CardActionArea>
                <CardMedia
                  image={`/products/${product.images[0]}`}
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
                Talla: <strong>M</strong>
              </Typography>

              {editable ? (
                <ItemCounter />
              ) : (
                <Typography variant='h6'>3 items</Typography>
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
              <Button variant='text' color='secondary'>
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
