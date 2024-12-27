export { GET, POST } from '@/lib/auth';
export const runtime = 'edge';

export const authOptions = {
  secret: process.env.AUTH_SECRET,
};
