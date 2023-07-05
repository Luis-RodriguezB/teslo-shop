import { User } from '@/models';
import { db } from '.';
import { IUser, User_Role } from '@/interfaces';
import bcrypt from 'bcryptjs';

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  let user: IUser | null = null;

  try {
    await db.connect();
    user = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  } finally {
    await db.disconnect();
  }

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { role, name, _id } = user;

  return {
    _id,
    email: email.toLowerCase(),
    role,
    name,
  };
};

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  try {
    await db.connect();
    const user = await User.findOne({ email: oAuthEmail });

    if (user) {
      await db.disconnect();
      const { _id, name, email, role } = user;
      return { _id, name, email, role };
    }

    const newUser = new User({
      email: oAuthEmail,
      name: oAuthName,
      password: '@',
      role: User_Role.USER_CLIENT,
    });
    await newUser.save();

    const { _id, name, email, role } = newUser;
    return { _id, name, email, role };
  } catch (error) {
    console.log(error);
  } finally {
    await db.disconnect();
  }
};
