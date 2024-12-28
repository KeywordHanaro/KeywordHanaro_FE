import { VoiceInputProvider } from '@/contexts/VoiceContext';
import { Suspense } from 'react';

export default function DocumentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <VoiceInputProvider>{children}</VoiceInputProvider>
    </Suspense>
  );
}
