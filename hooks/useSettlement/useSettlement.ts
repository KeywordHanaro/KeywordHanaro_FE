import { useApi } from '@/hooks/useApi';
import { SettlementMultiRequest } from '@/types/Settlement';

export const useSettlementApi = () => {
  const { fetchApi } = useApi();

  const sendMessage = async (settlementReq: SettlementMultiRequest) => {
    return await fetchApi('/settlement/message/multi', {
      method: 'POST',
      body: JSON.stringify(settlementReq),
    });
  };

  return {
    sendMessage,
  };
};
