export interface Transaction {
  id: number;
  date: string;
  time: string;
  description: string;
  amount: number;
  image: string;
}

export const transactions: Transaction[] = [
  {
    id: 1,
    date: '2024-10-19',
    time: '12:25:13',
    description: ' 성엽이 용돈',
    amount: 50000,
    image: '/images/banks/Hana.jpg',
  },
  {
    id: 2,
    date: '2024-12-30',
    time: '00:15:08',
    description: '러닝크루 정산',
    amount: -24000,
    image: '/images/banks/Shinhan.jpg',
  },
  {
    id: 3,
    date: '2024-10-19',
    time: '03:23:49',
    description: '월급',
    amount: 5000000,
    image: '/images/banks/KB.jpg',
  },
  {
    id: 4,
    date: '2023-10-19',
    time: '12:13:36',
    description: '코레일 카드 승인 취소',
    amount: 14200,
    image: '',
  },
  {
    id: 6,
    date: '2023-10-19',
    time: '12:13:36',
    description: '우체국 보험',
    amount: 14200,
    image: '/images/banks/Post.jpg',
  },
  {
    id: 8,
    date: '2024-02-19',
    time: '00:13:36',
    description: '하나로 곗돈',
    amount: 14200,
    image: '/images/banks/Hana.jpg',
  },
  {
    id: 45,
    date: '2023-12-19',
    time: '00:13:16',
    description: '인우 용돈',
    amount: -50000,
    image: '/images/banks/Toss.jpg',
  },
  {
    id: 12,
    date: '2022-10-19',
    time: '12:13:36',
    description: '코레일 카드 승인 취소',
    amount: 14200,
    image: '',
  },
  {
    id: 13,
    date: '2023-10-19',
    time: '12:13:36',
    description: '코레일 카드 승인 취소',
    amount: 14200,
    image: '',
  },
  {
    id: 15,
    date: '2023-10-19',
    time: '12:13:36',
    description: 'CU 성수점',
    amount: -1200,
    image: '',
  },
  {
    id: 16,
    date: '2023-10-19',
    time: '12:13:36',
    description: '코레일 카드 승인 취소',
    amount: 14200,
    image: '',
  },
];
