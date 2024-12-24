import { TransferProps } from '@/types/Transfer';

export type KeywordInputToOther = {
  fromAccountName: string;
  balance: number;
  toName: string;
  toAccountNumber: string;
  bankName: string;
};

export type KeywordInputToMe = {
  fromAccountName: string;
  balance: number;
  toAccountName: string;
  toAccountNumber: string;
};

export type KeywordSearchInputProps = KeywordInputToOther & {
  searchKeyword: string;
  amount?: number;
};

export const KeywordInputToOtherData: KeywordInputToOther = {
  fromAccountName: '여행적금 계좌',
  balance: 123000,
  toName: '정성엽',
  bankName: '기업',
  toAccountNumber: '999-000000-000',
};

export const KeywordInputToMeData = {
  fromAccountName: '나라사랑 계좌',
  balance: 123000,
  toAccountName: '적금 계좌',
  bankId: 3,
  toAccountNumber: '999-000000-000',
};

export const KeywordSearchInputToOtherData: KeywordSearchInputProps[] = [
  {
    fromAccountName: '여행적금 계좌',
    balance: 5000000,
    toName: '정성엽',
    bankName: '기업',
    toAccountNumber: '999-00-000',
    searchKeyword: '성엽이 용돈',
    amount: 50000,
  },
];

export const UseKeywordTransfer: TransferProps[] = [
  {
    type: 'WithoutAmount',
    fromAccount: {
      type: 'MyAccount',
      accountName: '문서아 취미 계쫘',
      bankId: 81,
      accountNumber: '1231-1231-1231',
      balance: '2000000',
    },
    toAccount: {
      type: 'OthersAccount',
      name: '도희',
      bankId: 3,
      accountNumber: '9999999',
    },
    checkEverytime: true, //금액은 매번 정한다.
    keyword: '서아 저금통',
    amount: 0,
  },
  {
    type: 'WithAmount',
    fromAccount: {
      type: 'MyAccount',
      accountName: '문서아 즐거워',
      bankId: 81,
      accountNumber: '222-2222-2225',
      balance: '2000000',
    },
    toAccount: {
      type: 'OthersAccount',
      name: '정성엽',
      bankId: 3,
      accountNumber: '223-2222-2221',
    },
    checkEverytime: false, //고정금액 송금.
    amount: 50000,
    keyword: '터틀넥즈 회식통장',
  },
];
