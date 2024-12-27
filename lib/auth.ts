// import NextAuth, { User } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        id: { label: 'Id', type: 'text' },
        passwd: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.id || !credentials.passwd) return null;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/be/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials.id,
              password: credentials.passwd,
            }),
          }
        );
        const jwt = await response.headers.get('Authorization');
        if (response.ok && jwt) {
          return {
            jwt: jwt.split(' ')[1],
            id: String(credentials.id),
            name: String(credentials.id),
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        jwt: token.jwt as string,
        id: token.id as string,
      };
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  trustHost: true,
});
