import { useApi } from '@/hooks/useApi';
import { TBranch } from '@/types/Bank';
import { TicketRequest } from '@/types/Ticket';

export const useBranchApi = () => {
  const { fetchApi } = useApi();

  const getBranchList = async (
    x: number,
    y: number,
    query?: string
  ): Promise<TBranch[]> => {
    const options: RequestInit = {
      method: 'GET',
    };

    const queryParams = new URLSearchParams({
      x: x.toString(),
      y: y.toString(),
      ...(query && { query }),
    });

    const response = await fetchApi(
      `/branch/search?${queryParams.toString()}`,
      options
    );

    return response;
  };

  const issueTicket = async (data: TicketRequest) => {
    return await fetchApi('/keyword', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return {
    getBranchList,
    issueTicket,
  };
};
