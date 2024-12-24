import { useApi } from '@/hooks/useApi';
import { pswdReq } from '@/types/Account';
import { TransferData, TransferResponse } from '@/types/Transfer';

export const useAccountApi = () => {
  const { fetchApi } = useApi();

  // 계좌 리스트 조회, 계좌 이체, 계좌 거래내역 조회

  const transfer = async (
    transferData: TransferData
  ): Promise<TransferResponse> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(transferData),
    };
    const response = await fetchApi(`/transfer`, options);

    return response;
  };

  const checkPswd = async (paswdData: pswdReq): Promise<boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(paswdData),
    };
    const response = await fetchApi(`/account/checkPassword`, options);

    return response;
  };

  const showMyAccounts = async () => {
    const options: RequestInit = {
      method: 'GET',
    };
    const response = await fetchApi(`/account/myaccounts`, options);

    return response;
  };

  return {
    transfer,
    checkPswd,
    showMyAccounts,
  };
};
