//settlement 전용 API 타입
export type activateSettlement = {
  amount: number;
  groupMember: string;
  account: Account;
};

export type groupMember = {
  name: string;
  tel: string;
};

type Account = {
  accountNumber: string;
  name: string;
};
