import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '@/database';
import { User } from '@/models';
import { jwt } from '@/utils';
import { UserResponse } from '@/interfaces';

type Data = { message: string } | { token: string; user: UserResponse };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return loginUser(req, res);

    default:
      res.status(400).json({
        message: 'Bad Request',
      });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '' } = req.body;

  try {
    await db.connect();
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Correo o contraseña no válidos' });
    }

    if (!bcrypt.compareSync(password, user.password!)) {
      return res
        .status(400)
        .json({ message: 'Correo o contraseña no válidos' });
    }

    const { role, name, _id } = user;

    const token = jwt.signToken(_id, email);

    return res.status(200).json({
      token,
      user: {
        name,
        email,
        role,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    await db.disconnect();
  }
};
