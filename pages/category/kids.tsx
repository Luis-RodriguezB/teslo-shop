import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';

const KidsPage = () => {
  const { isLoading, products } = useProducts('/products?gender=kid');

  return (
    <ShopLayout
      title='Teslo-Shop - Niños'
      pageDescription='Encuentra los mejores productos de Teslo para niños'
    >
      <Typography variant='h1' component='h1' sx={{ mb: 4 }}>
        Tienda
      </Typography>
      <Typography variant='h2' sx={{ mb: 2 }}>
        Todos los productos para niños
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidsPage;
