import { TBranch } from './Bank';

// API 요청용 type 정의
export type TicketRequest = {
  keywordId: number;
  workNumber: number;
  branchId: number;
  branchName: string;
};

// Frontend 렌더링 용 type 정의
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

export type IssueTicketResponse = {
  id: number;
  branchId: number;
  branchName: string;
  waitingNumber: number;
  waitingGuest: number;
  workNumber: string;
};
