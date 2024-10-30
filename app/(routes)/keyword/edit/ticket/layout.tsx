import { TicketProvider } from '@/contexts/TicketContext';

export default function EditTicketKeywordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TicketProvider>{children}</TicketProvider>
    </>
  );
}
