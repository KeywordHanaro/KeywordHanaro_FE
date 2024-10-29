
import { Suspense } from 'react';

export default function DocumentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense>{children}</Suspense>;
}
