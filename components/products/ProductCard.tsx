import { FC, useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from '@mui/material';
import { getNumberFormat } from '@/utils';
import { IProduct } from '@/interfaces';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `products/${product.images[1]}`
      : `products/${product.images[0]}`;
  }, [isHovered]);

  return (
    <>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardActionArea>
          <CardMedia
            component='img'
            image={productImage}
            alt={product.title}
            className='fadeIn'
          />
        </CardActionArea>
      </Card>

      <Box sx={{ mt: 1 }} className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>
          {getNumberFormat(product.price, {
            format: 'en',
            style: 'currency',
            currency: 'USD',
          })}
        </Typography>
      </Box>
    </>
  );
};