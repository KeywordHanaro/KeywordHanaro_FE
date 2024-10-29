import { TransferUseFormDataProvider } from '@/contexts/TransferUseContext';

export default function transferLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TransferUseFormDataProvider>{children}</TransferUseFormDataProvider>
    </>
  );
}
