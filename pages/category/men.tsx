import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';

const MenPage = () => {
  const { isLoading, products } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title='Teslo-Shop - Hombres'
      pageDescription='Encuentra los mejores productos de Teslo para hombres'
    >
      <Typography variant='h1' component='h1' sx={{ mb: 4 }}>
        Tienda
      </Typography>
      <Typography variant='h2' sx={{ mb: 2 }}>
        Todos los productos para hombres
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
