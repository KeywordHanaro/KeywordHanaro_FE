import { TicketProps, TicketTask } from '@/types/Ticket';

export const ticketKeyword: TicketProps[] = [
  {
    branch: {
      id: '1',
      placeName: '성수역',
      distance: '100',
      addressName:
        '서울특별시 성동구 성수이로 113 [성수2가 3동 289010 제강빌딩 2층]',
      phone: '02)462-7627',
    },
    keyword: '성수 번호표',
  },
  {
    branch: {
      id: '2',
      placeName: '성수역',
      distance: '100',
      addressName:
        '서울특별시 성동구 성수이로 113 [성수2가 3동 289010 제강빌딩 2층]',
      phone: '02)462-7627',
    },
    keyword: '성수 번호표',
  },
];

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
