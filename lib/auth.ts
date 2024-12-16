import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'Id',
      credentials: {
        id: { label: 'Id', type: 'text' },
        passwd: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.id || !credentials.passwd) return null;

        console.log('🚀  credentials:', credentials);
        const { id } = credentials;
        const user = { email: id, name: 'TmpUser' } as User;
        return user;
      },
    }),
  ],
  callbacks: {
    session({ session }) {
      console.log('🚀 cb - session:', session.user);
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  trustHost: true,
});
