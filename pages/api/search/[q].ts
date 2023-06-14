import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { Product } from '@/models';
import { IProduct } from '@/interfaces';

type Data = { message: string } | IProduct[] | IProduct;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchProducts(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { q = '' } = req.query;

  if (q.length === 0) {
    return res.status(400).json({
      message: 'Debe de especificar el query de búsqueda',
    });
  }

  try {
    q = q.toString().toLowerCase();
    db.connect();

    const products = await Product.find({
      $text: { $search: q },
    })
      .select('title images price inStock slug -_id')
      .lean();

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Algo ha fallado, por favor contactar con el supervisor',
    });
  } finally {
    await db.disconnect();
  }
};
