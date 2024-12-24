import { TBranch } from './Bank';

export type Ticket = {
  id: number;
  user: string;
  branchId: number;
  branchName: string;
  waitingNumber: number;
  waitingGuest: number;
  workNumber: string;
  createAt: string;
};

export type TicketProps = {
  branch: TBranch;
  keyword: string;
};

export type TicketTask = {
  name: string;
  description: string;
  path: string;
  src: string;
};
