import { FC } from 'react';
import { Grid } from '@mui/material';
import { ProductCard } from './ProductCard';
import { IProduct } from '@/interfaces';

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={6} sm={4} key={product.slug}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
