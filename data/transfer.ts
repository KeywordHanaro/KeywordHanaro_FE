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
