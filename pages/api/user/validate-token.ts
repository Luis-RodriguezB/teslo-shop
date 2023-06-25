import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '@/database';
import { User } from '@/models';
import { jwt, validations } from '@/utils';
import { UserResponse } from '@/interfaces';

type Data = { message: string } | { token: string; user: UserResponse };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return checkJWT(req, res);

    default:
      res.status(400).json({
        message: 'Bad Request',
      });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies;
  let userId = '';

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    return res.status(401).json({
      message: 'Token de autorización no es válido',
    });
  }

  try {
    await db.connect();
    const user = await User.findById(userId).lean();

    if (!user)
      return res
        .status(400)
        .json({ message: 'No existe el usuario con el ID' });

    const { _id, email, role, name } = user;

    return res.status(200).json({
      token: jwt.signToken(_id, email),
      user: { name, email, role },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Revisar logs del servidor' });
  } finally {
    await db.disconnect();
  }
};
