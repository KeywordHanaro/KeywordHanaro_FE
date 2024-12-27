import { MyAccount } from '@/types/Account';
import { groupMember } from '@/types/Keyword';

export type FormData = {
  fromAccount: MyAccount;
  members: groupMember[];
  category: 'Settlement' | 'Dues';
  checkEveryTime: boolean;
  amount: string;
  keywordName: string;
};
