import { Ticket } from "./Ticket";

export type User = {
  createAt: string;
  updateAt: string;
  id: string;
  username: string;
  password: string;
  name: string;
  status: string;
  email: string;
  tel: string;
  permission: number;
  ticket: Ticket;
};
