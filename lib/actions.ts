'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/lib/auth';

export { signIn as mySignIn, signOut as mySignOut };

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const id = formData.get('id');
  const passwd = formData.get('passwd');

  if (!id || !passwd) {
    return 'Input the ID or password!!';
  }

  try {
    //fetch로 로그인 확인하기
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'EmailSignInError':
          return error.message;
        case 'CredentialsSignin':
          return 'Invalid Credentials!';
        default:
          return 'Something went wrong!';
      }
    }
    throw error;
  }
}
