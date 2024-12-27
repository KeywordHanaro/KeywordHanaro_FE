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
          `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
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
        const data = await response.json();
        if (response.ok && jwt) {
          return {
            jwt: jwt.split(' ')[1],
            id: String(credentials.id),
            name: String(credentials.id),
            permission: data.permission?.toString() ?? '0', // 퍼미션 추가
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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
        token.permission = user.permission; // 퍼미션 추가
      }

      // 2) 클라이언트에서 update()를 할 때, trigger === 'update'로 들어온다
      if (trigger === 'update' && session?.user) {
        // 이 session은 'update' 호출 시 클라이언트가 넘긴 값
        // session.user.permission을 받아서 token.permission에 저장
        token.permission = session.user.permission;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        jwt: token.jwt as string,
        id: token.id as string,
        permission: token.permission as string, // 퍼미션 추가
      };
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  trustHost: true,
});
