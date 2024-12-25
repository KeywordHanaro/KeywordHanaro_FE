import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  console.log('middleware call auth');
  const didLogin = !!session?.user;
  console.log("🚀 ~ middleware ~ didLogin:", didLogin)

  const signinPath = '/login';

  if (didLogin && req.nextUrl.pathname === signinPath) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (!didLogin && req.nextUrl.pathname !== signinPath) {
    // const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/login`, req.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|images|api/auth|login|regist|$).*)', '/login', '/'],
};
