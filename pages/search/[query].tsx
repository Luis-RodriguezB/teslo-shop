import { GetServerSideProps, NextPage } from 'next';
import { ShopLayout } from '@/components/layouts';
import { Box, Typography } from '@mui/material';
import { ProductList } from '@/components/products';
import { IProduct } from '@/interfaces';
import { dbProducts } from '@/database';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title='Teslo-Shop - Search'
      pageDescription='Encuentra los mejores productos de Teslo aquí.'
    >
      <Typography variant='h1' component='h1' sx={{ mb: 4 }}>
        Buscar producto
      </Typography>

      {foundProducts ? (
        <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>
          Término: {query}
        </Typography>
      ) : (
        <>
          <Box display='flex' sx={{ mb: 3 }}>
            <Typography variant='h2'>No encontramos ningún producto</Typography>
            <Typography
              variant='h2'
              sx={{ ml: 1 }}
              color='secondary'
              textTransform='capitalize'
            >
              {query}
            </Typography>
          </Box>
          <Typography variant='h2' sx={{ mb: 2 }}>
            Productos que quizás te puedan interesar
          </Typography>
        </>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  let products: IProduct[] = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
