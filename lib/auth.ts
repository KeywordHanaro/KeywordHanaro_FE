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
      name: 'Email',
      credentials: {
        email: {
          label: '이메일',
          type: 'email',
          placeholder: 'example@example.com',
        },
        passwd: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.passwd)
          return null;

        console.log('🚀  credentials:', credentials);
        const { email } = credentials;
        const user = { email, name: 'TmpUser' } as User;
        return user;
      },
    }),
  ],
  callbacks: {
    session({ session }) {
      console.log('🚀 cb - session:', session);
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  trustHost: true,
});
