import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { Product } from '@/models';
import { IProduct } from '@/interfaces';

type Data = { message: string } | IProduct;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const { slug = '' } = req.query;
    db.connect();
    const productBySlug = await Product.findOne({ slug: slug }).lean();

    if (!productBySlug) {
      return res
        .status(404)
        .json({ message: `Product not found with slug: ${slug}` });
    }
    return res.status(200).json(productBySlug);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Algo ha fallado, por favor contactar con el supervisor',
    });
  } finally {
    db.disconnect();
  }
};
