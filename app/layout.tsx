import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { auth } from '@/lib/auth';
import './globals.css';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '키워드 하나로',
  description: '키워드 하나로 빠르게 실행해보세요',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html>
        <body className={`font-pretendard ${pretendard.variable} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
