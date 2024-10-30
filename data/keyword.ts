import { MyAccount, OthersAccount } from './account';
import { Member } from './member';

export type Account = {
  bankId: number;
  accountNumber: string;
  accountName?: string;
};

export type Keyword = {
  id: number;
  type:
    | 'transfer'
    | 'transferAmount'
    | 'inquiry'
    | 'ticket'
    | 'settlement'
    | 'settlementAmount';
  // 송금, 조회, 번호표, 정산
  title: string;
  description: string;
  isFavorite: boolean;
};

export type KeywordDetail =
  | TransferKeyword
  | TransferAmountKeyword
  | InquiryKeyword
  | TicketKeyword
  | SettlementKeyword
  | SettlementAmountKeyword;

type BaseKeyword = {
  id: number;
  title: string;
};

export type TransferKeyword = BaseKeyword & {
  type: 'transfer';
  accountFrom: MyAccount;
  accountTo: OthersAccount | MyAccount;
};

export type TransferAmountKeyword = BaseKeyword & {
  type: 'transferAmount';
  accountFrom: MyAccount;
  accountTo: OthersAccount | MyAccount;
  amount: string;
};

export type InquiryKeyword = BaseKeyword & {
  type: 'inquiry';
  accountFrom: MyAccount;
  searchKeyword: string;
};

export type TicketKeyword = BaseKeyword & {
  type: 'ticket';
  bankName: string;
};

export type SettlementKeyword = BaseKeyword & {
  type: 'settlement';
  accountFrom: MyAccount;
  memberList: Member[];
};

export type SettlementAmountKeyword = BaseKeyword & {
  type: 'settlementAmount';
  accountFrom: MyAccount;
  memberList: Member[];
  amount: number;
};

export const getColorByType = (type: Keyword['type']) => {
  switch (type) {
    case 'transfer':
    case 'transferAmount':
      return 'pink';
    case 'inquiry':
      return 'green';
    case 'ticket':
      return 'yellow';
    case 'settlement':
    case 'settlementAmount':
      return 'blue';
    default:
      return '';
  }
};

export const getNameByType = (type: Keyword['type']) => {
  switch (type) {
    case 'transfer':
    case 'transferAmount':
      return '송금';
    case 'inquiry':
      return '조회';
    case 'ticket':
      return '번호표';
    case 'settlement':
    case 'settlementAmount':
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
  {
    id: 7,
    type: 'transfer',
    title: '성엽이 용돈',
    description: '송금 > 정성엽 > 5만원',
    isFavorite: false,
  },
  {
    id: 8,
    type: 'inquiry',
    title: '월급 확인',
    description: '조회 > 성수',
    isFavorite: true,
  },
  {
    id: 9,
    type: 'transfer',
    title: '성엽이 용돈',
    description: '송금 > 정성엽 > 5만원',
    isFavorite: false,
  },
  {
    id: 10,
    type: 'ticket',
    title: '성수점 번호표',
    description: '번호표 > 성수역점',
    isFavorite: true,
  },
  {
    id: 11,
    type: 'transfer',
    title: '성엽이 용돈',
    description: '송금 > 정성엽 > 5만원',
    isFavorite: false,
  },
  {
    id: 12,
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
      type: 'MyAccount',
      accountName: '문서아 취미 계쫘',
      bankId: 81,
      accountNumber: '222-2222-2221',
    },
    accountTo: {
      type: 'OthersAccount',
      bankId: 2,
      accountNumber: '987-654-321',
      name: '정성엽',
    },
  },
  {
    id: 2,
    type: 'transfer',
    title: '세뱃돈 송금',
    accountFrom: {
      type: 'MyAccount',
      bankId: 1,
      accountNumber: '111-222-333',
      accountName: '하나은행',
    },
    accountTo: {
      bankId: 3,
      type: 'OthersAccount',
      accountNumber: '444-555-666',
      name: '김유진',
    },
  },
  {
    id: 9,
    type: 'transferAmount',
    title: '세뱃돈 송금',
    accountFrom: {
      type: 'MyAccount',
      bankId: 1,
      accountNumber: '111-222-333',
      accountName: '하나은행',
    },
    accountTo: {
      bankId: 3,
      type: 'MyAccount',
      accountNumber: '444-555-666',
      accountName: '내일배움계좌',
    },
    amount: '30000',
  },

  // InquiryKeyword
  {
    id: 3,
    type: 'inquiry',
    title: '월급 확인',
    accountFrom: {
      type: 'MyAccount',
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
      type: 'MyAccount',
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
    type: 'settlementAmount',
    title: '러닝크루 정산',
    accountFrom: {
      type: 'MyAccount',
      accountName: '문서아 취미 계쫘',
      bankId: 81,
      accountNumber: '222-2222-2221',
    },
    memberList: [
      { id: 1, name: '이름1', phoneNumber: '010-4824-1469' },
      { id: 2, name: '이름2', phoneNumber: '010-9110-5864' },
      { id: 3, name: '이름3', phoneNumber: '010-1541-2537' },
      { id: 4, name: '이름4', phoneNumber: '010-5392-3797' },
      { id: 5, name: '이름5', phoneNumber: '010-4046-7672' },
      { id: 6, name: '이름6', phoneNumber: '010-4824-1469' },
    ],
    amount: 50000,
  },
  {
    id: 8,
    type: 'settlement',
    title: '팀 회식 비용 정산',
    accountFrom: {
      type: 'MyAccount',
      accountName: '문서아 취미 계쫘',
      bankId: 81,
      accountNumber: '222-2222-2221',
    },
    memberList: [
      { id: 1, name: '이름1', phoneNumber: '010-4824-1469' },
      { id: 2, name: '이름2', phoneNumber: '010-9110-5864' },
      { id: 3, name: '이름3', phoneNumber: '010-1541-2537' },
      { id: 4, name: '이름4', phoneNumber: '010-5392-3797' },
      { id: 5, name: '이름5', phoneNumber: '010-4046-7672' },
      { id: 6, name: '이름6', phoneNumber: '010-4824-1469' },
    ],
  },
];
