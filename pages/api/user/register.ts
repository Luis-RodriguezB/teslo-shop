import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '@/database';
import { User } from '@/models';
import { jwt, validations } from '@/utils';
import { UserResponse } from '@/interfaces';

type Data = { message: string } | { token: string; user: UserResponse };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

    default:
      res.status(400).json({
        message: 'Bad Request',
      });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string };

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'La contraseña debe ser mínimo de 6 caracteres' });
    }

    if (!validations.isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: 'Debe de ser un correo permitido' });
    }

    await db.connect();
    const user = await User.findOne({ email });

    if (user) {
      await db.disconnect();
      return res.status(400).json({ message: 'Ese correo ya está registrado' });
    }

    const newUser = new User({
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password),
      role: 'client',
      name,
    });

    await newUser.save({ validateBeforeSave: true });
    const { _id, role } = newUser;

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
    return res.status(500).json({ message: 'Revisar logs del servidor' });
  } finally {
    await db.disconnect();
  }
};
