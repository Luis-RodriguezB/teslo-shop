import { Product } from '@/models';
import { db } from '.';
import { IProduct, ProductSlug } from '@/interfaces';

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  let product = null;

  try {
    await db.connect();
    product = await Product.findOne({ slug }).lean();

    if (!product) return null;
  } catch (error) {
    console.log(error);
  } finally {
    await db.disconnect();
  }

  return JSON.parse(JSON.stringify(product));
};

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
  let slugs: ProductSlug[] = [];
  try {
    await db.connect();
    slugs = await Product.find().select('slug -_id').lean();
  } catch (error) {
    console.log(error);
  } finally {
    await db.disconnect();
  }

  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  const queryTerm = term.toString().toLowerCase();
  let products: IProduct[] = [];

  try {
    db.connect();
    products = await Product.find({
      $text: { $search: queryTerm },
    })
      .select('title images price inStock slug -_id')
      .lean();
  } catch (error) {
    console.log(error);
  } finally {
    await db.disconnect();
  }

  return JSON.parse(JSON.stringify(products));
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  let products: IProduct[] = [];

  try {
    db.connect();
    products = await Product.find()
      .select('title images price inStock slug -_id')
      .lean();
  } catch (error) {
    console.log(error);
  } finally {
    db.disconnect();
  }

  return products;
};
