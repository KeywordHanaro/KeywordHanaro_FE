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
    isFavorite: true,
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
    type: 'ticket',
    title: '성수점 번호표',
    description: '번호표 > 성수역점',
    isFavorite: true,
  },
  {
    id: 4,
    type: 'settlementAmount',
    title: '터틀넥즈 정산',
    description: '정산/회비 > 남인우, 박준용, 문서아... > 3만원',
    isFavorite: true,
  },
  {
    id: 5,
    type: 'settlement',
    title: '등산팸 정산',
    description: '정산/회비 > 문해빈, 이규호, 조경은 > 금액 미정',
    isFavorite: true,
  },
  {
    id: 6,
    type: 'transfer',
    title: '아빠 용돈',
    description: '송금 > 정성호 > 35만원',
    isFavorite: false,
  },
  {
    id: 7,
    type: 'inquiry',
    title: '삼성카드 환급 확인',
    description: '조회 > 삼성카드 환급',
    isFavorite: false,
  },
  {
    id: 8,
    type: 'transfer',
    title: '전기세 납부',
    description: '송금 > 한국전력공사 > 금액미정',
    isFavorite: false,
  },
  {
    id: 9,
    type: 'ticket',
    title: '압구정 번호표',
    description: '번호표 > 압구정점',
    isFavorite: false,
  },
];

export const KeywordDetailList: KeywordDetail[] = [
  // TransferKeyword
  {
    id: 1,
    type: 'transfer',
    title: '성엽이 용돈',
    accountFrom: {
      type: 'MyAccount',
      accountName: '하나패스 자유입출금',
      bankId: 81,
      accountNumber: '156-5483-111-6854',
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
    type: 'inquiry',
    title: '월급 확인',
    accountFrom: {
      type: 'MyAccount',
      bankId: 81,
      accountNumber: '156-5483-111-6854',
      accountName: '하나패스 자유입출금',
    },
    searchKeyword: '급여',
  },
  {
    id: 3,
    type: 'ticket',
    title: '성수점 번호표',
    bankName: '성수점',
  },
  {
    id: 4,
    type: 'settlementAmount',
    title: '터틀넥즈 정산',
    accountFrom: {
      type: 'MyAccount',
      accountName: '하나패스 자유입출금',
      bankId: 81,
      accountNumber: '156-5483-111-6854',
    },
    memberList: [
      { id: 1, name: '남인우', phoneNumber: '010-4824-1469' },
      { id: 2, name: '박준용', phoneNumber: '010-9110-5864' },
      { id: 3, name: '문서아', phoneNumber: '010-1541-2537' },
      { id: 4, name: '정성엽', phoneNumber: '010-5392-3797' },
      { id: 5, name: '김도희', phoneNumber: '010-4046-7672' },
    ],
    amount: 30000,
  },
  {
    id: 5,
    type: 'settlement',
    title: '등산팸 정산',
    accountFrom: {
      type: 'MyAccount',
      bankId: 81,
      accountNumber: '456-4236-454-11',
      accountName: '청년 힘내라 저축',
    },
    memberList: [
      { id: 6, name: '문해빈', phoneNumber: '010-4824-1469' },
      { id: 7, name: '이규호', phoneNumber: '010-9110-5864' },
      { id: 8, name: '조경은', phoneNumber: '010-1541-2537' },
    ],
  },
  {
    id: 6,
    type: 'transferAmount',
    title: '아빠 용돈',
    accountFrom: {
      type: 'MyAccount',
      bankId: 81,
      accountNumber: '456-4236-454-11',
      accountName: '청년 힘내라 저축',
    },
    accountTo: {
      bankId: 88,
      type: 'OthersAccount',
      accountNumber: '110-412-625368',
      name: '정성호',
    },
    amount: '350000',
  },
  {
    id: 7,
    type: 'inquiry',
    title: '삼성카드 환급 확인',
    accountFrom: {
      type: 'MyAccount',
      bankId: 81,
      accountNumber: '156-5483-111-6854',
      accountName: '하나패스 자유입출금',
    },
    searchKeyword: '삼성카드 환급',
  },
  {
    id: 8,
    type: 'transfer',
    title: '전기세 납부',
    accountFrom: {
      type: 'MyAccount',
      bankId: 81,
      accountNumber: '456-4236-454-11',
      accountName: '청년 힘내라 저축',
    },
    accountTo: {
      type: 'MyAccount',
      bankId: 4,
      accountNumber: '25-777-888-999',
      accountName: '한국전력공사',
    },
  },
  {
    id: 9,
    type: 'ticket',
    title: '압구정 번호표',
    bankName: '압구정점',
  },
];
