import { useContext, useState } from 'react';
import { ICartProduct, IProduct, ISize } from '@/interfaces';

interface Props {
  product: IProduct;
}

export const useProductCart = (product: IProduct) => {
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    description: product.description,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  const onUpdateQuantity = (quantitySelected: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity: quantitySelected,
    }));
  };

  const onResetQuantity = () => {
    setTempCartProduct((currentQuantity) => ({
      ...currentQuantity,
      quantity: 1,
    }));
  };

  return {
    tempCartProduct,

    onResetQuantity,
    onSelectedSize,
    onUpdateQuantity,
  };
};
