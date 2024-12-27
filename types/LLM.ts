export type info = {
  status: string;
  message: string;
  data: string;
};
export type query = {
  question: string;
};

export type answer = {
  id?: number;
  userId?: string;
  question: string;
  answer: string;
  createdAt?: string;
};
