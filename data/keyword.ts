export type Keyword = {
  id: number;
  type: 'transfer' | 'inquiry' | 'ticket' | 'settlement';
  // 송금, 조회, 번호표, 정산
  title: string;
  description: string;
  isFavorite: boolean;
};

export type KeywordDetail =
  | TransferKeyword
  | InquiryKeyword
  | TicketKeyword
  | SettlementKeyword;

type Member = {
  name: string;
};

export type Account = {
  bankId: number;
  accountNumber: string;
  accountName?: string;
};

type BaseKeyword = {
  id: number;
  title: string;
};

export type TransferKeyword = BaseKeyword & {
  type: 'transfer';
  accountFrom: Account;
  accountTo: Account;
  amount: number;
};

export type InquiryKeyword = BaseKeyword & {
  type: 'inquiry';
  accountFrom: Account;
  searchKeyword: string;
};

export type TicketKeyword = BaseKeyword & {
  type: 'ticket';
  bankName: string;
};

export type SettlementKeyword = BaseKeyword & {
  type: 'settlement';
  accountFrom: Account;
  memberList: Member[];
  amount: number;
};

export const getColorByType = (type: Keyword['type']) => {
  switch (type) {
    case 'transfer':
      return 'pink';
    case 'inquiry':
      return 'green';
    case 'ticket':
      return 'yellow';
    case 'settlement':
      return 'blue';
    default:
      return '';
  }
};

export const getNameByType = (type: Keyword['type']) => {
  switch (type) {
    case 'transfer':
      return '송금';
    case 'inquiry':
      return '조회';
    case 'ticket':
      return '번호표';
    case 'settlement':
      return '정산/회비';
    default:
      return '';
  }
};

export const keywordList: Keyword[] = [
  {
    id: 1,
    type: 'transfer',
    title: '성엽이 용돈',
    description: '송금 > 정성엽 > 5만원',
    isFavorite: false,
  },
  {
    id: 2,
    type: 'inquiry',
    title: '월급 확인',
    description: '조회 > 급여',
    isFavorite: true,
  },
  {
    id: 3,
    type: 'transfer',
    title: '성엽이 용돈',
    description: '송금 > 정성엽 > 5만원',
    isFavorite: false,
  },
  {
    id: 4,
    type: 'ticket',
    title: '성수점 번호표',
    description: '번호표 > 성수역점',
    isFavorite: true,
  },
  {
    id: 5,
    type: 'transfer',
    title: '성엽이 용돈',
    description: '송금 > 정성엽 > 5만원',
    isFavorite: false,
  },
  {
    id: 6,
    type: 'transfer',
    title: '성엽이 용돈',
    description: '송금 > 정성엽 > 5만원',
    isFavorite: true,
  },
];

export const KeywordDetailList: KeywordDetail[] = [
  // TransferKeyword
  {
    id: 1,
    type: 'transfer',
    title: '아빠 용돈',
    accountFrom: {
      bankId: 1,
      accountNumber: '123-456-789',
      accountName: '하나임금',
    },
    accountTo: {
      bankId: 2,
      accountNumber: '987-654-321',
      accountName: '정성엽',
    },
    amount: 50000,
  },
  {
    id: 2,
    type: 'transfer',
    title: '세뱃돈 송금',
    accountFrom: {
      bankId: 1,
      accountNumber: '111-222-333',
      accountName: '하나은행',
    },
    accountTo: {
      bankId: 3,
      accountNumber: '444-555-666',
      accountName: '김유진',
    },
    amount: 30000,
  },

  // InquiryKeyword
  {
    id: 3,
    type: 'inquiry',
    title: '월급 확인',
    accountFrom: {
      bankId: 1,
      accountNumber: '123-456-789',
      accountName: '하나임금',
    },
    searchKeyword: '급여',
  },
  {
    id: 4,
    type: 'inquiry',
    title: '신용카드 사용내역 조회',
    accountFrom: {
      bankId: 4,
      accountNumber: '777-888-999',
      accountName: '신한은행',
    },
    searchKeyword: '사용내역',
  },

  // TicketKeyword
  {
    id: 5,
    type: 'ticket',
    title: '성수역점 번호표',
    bankName: '성수역점',
  },
  {
    id: 6,
    type: 'ticket',
    title: '여의도점 번호표',
    bankName: '여의도',
  },

  // SettlementKeyword
  {
    id: 7,
    type: 'settlement',
    title: '러닝크루 정산',
    accountFrom: {
      bankId: 1,
      accountNumber: '123-456-789',
      accountName: '하나임금',
    },
    memberList: [
      { name: '김인애' },
      { name: '박준호' },
      { name: '하이진' },
      { name: '정서연' },
    ],
    amount: 50000,
  },
  {
    id: 8,
    type: 'settlement',
    title: '팀 회식 비용 정산',
    accountFrom: {
      bankId: 5,
      accountNumber: '222-333-444',
      accountName: '카카오뱅크',
    },
    memberList: [{ name: '지민' }, { name: '민수' }, { name: '영희' }],
    amount: 100000,
  },
];
