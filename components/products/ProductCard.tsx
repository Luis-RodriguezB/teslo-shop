import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
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
  const [isImageLoaded, setisImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <NextLink href={`/product/${product.slug}`} prefetch={false}>
          <CardActionArea>
            <CardMedia
              component='img'
              image={productImage}
              alt={product.title}
              className='fadeIn'
              onLoad={() => setisImageLoaded(true)}
            />
          </CardActionArea>
        </NextLink>
      </Card>

      <Box
        sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }}
        className='fadeIn'
      >
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
