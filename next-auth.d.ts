// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    jwt: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      jwt: string;
    };
  }
}
