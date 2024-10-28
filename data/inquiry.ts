import { Transaction, transactionList } from './transaction';

type InquiryProps = {
  id: number;
  transactions: Transaction[];
  searchKeyword: string;
};

export const InquiryList: InquiryProps[] = [
  {
    id: 2,
    transactions: transactionList,
    searchKeyword: '급여',
  },
  {
    id: 8,
    transactions: transactionList,
    searchKeyword: '성수',
  },
  {
    id: 1,
    transactions: transactionList,
    searchKeyword: '급여',
  },
];
