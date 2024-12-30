import { useApi } from '@/hooks/useApi';
import { SettlementMultiRequest, SettlementSingleRequest } from '@/types/Settlement';

export const useSettlementApi = () => {
  const { fetchApi } = useApi();

  const sendMultiMessage = async (settlementReq: SettlementMultiRequest) => {
    return await fetchApi('/settlement/message/multi', {
      method: 'POST',
      body: JSON.stringify(settlementReq),
    });
  };

  const sendMessage = async(settlementReq: SettlementSingleRequest)=>{
    return await fetchApi('/settlement/message', {
      method: 'POST',
      body: JSON.stringify(settlementReq),
    });
  }

  return {
    sendMessage,
    sendMultiMessage
  };
};
