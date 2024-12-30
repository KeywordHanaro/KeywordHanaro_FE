import { TicketTask } from '@/types/Ticket';

export const ticketTasks: TicketTask[] = [
  {
    name: '예금',
    description: '(송금, 입금, 출금, 예적금 등)',
    path: '/ticket/detail?task=예금',
    src: '/images/icons/deposit.png',
  },
  {
    name: '개인 대출',
    description: '',
    path: '/ticket/detail?task=개인 대출',
    src: '/images/icons/personalLoan.png',
  },
  {
    name: '기업 대출',
    description: '',
    path: '/ticket/detail?task=기업 대출',
    src: '/images/icons/corporateLoan.png',
  },
];
