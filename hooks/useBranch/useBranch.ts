import { useApi } from '@/hooks/useApi';
import { TBranch } from '@/types/Bank';
import { TicketRequest } from '@/types/Ticket';
import { useSession } from 'next-auth/react';

export const useBranchApi = () => {
  const { fetchApi } = useApi();
  const { data: session, update } = useSession();

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
    return await fetchApi('/ticket', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  const savePermission = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ticket/permission`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.user?.jwt}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(1),
        }
      );

      if (!response.ok) {
        throw new Error('Permission update failed');
      }

      if (session) {
        const newSession = {
          ...session,
          user: {
            ...session.user,
            permission: '1',
          },
        };
        const updatedSession = await update(newSession);
        console.log('Updated session:', updatedSession);
      }
      return true;
    } catch (error) {
      console.error('Permission update failed:', error);
      return false;
    }
  };

  return {
    getBranchList,
    issueTicket,
    savePermission,
  };
};
