import { dbUsers } from '@/database';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
  interface User {
    id?: string;
  }
}

export default NextAuth({
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Correo',
          type: 'email',
          placeholder: 'correo@google.com',
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: 'Contraseña',
        },
      },
      async authorize(credentials) {
        // return { name: 'Luis', email: 'luis55@gmail.com', role: 'admin' };
        if (!credentials) return null;

        const { email, password } = credentials;
        return await dbUsers.checkUserEmailPassword(email, password);
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  jwt: {},

  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(
              user.email || '',
              user.name || ''
            );
            break;

          case 'credentials':
            token.user = user;
            break;

          default:
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as any;
      return session;
    },
  },
});
