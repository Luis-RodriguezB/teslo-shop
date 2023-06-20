import { useContext } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { dbProducts } from '@/database';

import { ShopLayout } from '@/components/layouts';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ProductSlideshow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';

import { IProduct, ProductSlug } from '@/interfaces';
import { getNumberFormat } from '@/utils';
import { CartContext } from '@/context';
import { useProductCart } from '@/hooks';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);
  const { tempCartProduct, onSelectedSize, onUpdateQuantity } = useProductCart(product);

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;

    addProductToCart(tempCartProduct);
    router.push('/cart');
  };

  return (
    <ShopLayout title='Teslo-Shop - Producto' pageDescription=''>
      <Grid container paddingY={5}>
        <Grid item xs={12} sm={7} padding={2}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5} padding={2}>
          <Box display='flex' flexDirection='column'>
            {/** Titulos */}
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              {getNumberFormat(product.price, {
                format: 'en',
                style: 'currency',
                currency: 'USD',
              })}
            </Typography>

            {/** Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>

              <ItemCounter
                inStock={product.inStock}
                currentQuantity={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
              />

              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={onSelectedSize}
              />
            </Box>

            {/** Agregar al carrito */}

            {product.inStock > 0 ? (
              <Button
                color='secondary'
                className='circular-btn'
                onClick={onAddProduct}
              >
                {tempCartProduct.size
                  ? 'Agregar al carrito'
                  : 'Seleccione una talla'}
              </Button>
            ) : (
              <Chip
                label='No hay disponibles'
                color='error'
                variant='outlined'
              />
            )}

            {/* <Chip label='No hay disponibles' color='error' variant='outlined' /> */}

            {/** Descripcion */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productsSlug: ProductSlug[] = await dbProducts.getAllProductsSlugs();

  return {
    paths: productsSlug.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 86400,
  };
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = '' } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

export default ProductPage;
