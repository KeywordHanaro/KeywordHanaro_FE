import { useApi } from '@/hooks/useApi';
import { Account, pswdReq } from '@/types/Account';
import { Transaction } from '@/types/Keyword';
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

  const checkMasterPswd = async (paswdData: pswdReq): Promise<boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(paswdData),
    };
    const response = await fetchApi(`/account/checkPassword`, options);

    return response;
  };

  const showMyAccounts = async (): Promise<Account[]> => {
    const response = await fetchApi(`/account/myaccounts`);

    return response;
  };

  // 거래 내역 조회 - 날짜로
  const showMyTransactions = async (
    accountId: number,
    startDate: string,
    endDate: string,
    transactionType: string,
    sortOrder: string,
    searchWord: string
  ): Promise<Transaction[]> => {
    const queryParams = new URLSearchParams({
      startDate,
      endDate,
      transactionType,
      sortOrder,
      searchWord,
    });

    const response = await fetchApi(
      `/inquiry/${accountId}?${queryParams.toString()}`,
      {
        method: 'GET',
      }
    );

    return response;
  };

  return {
    transfer,
    checkPswd,
    showMyAccounts,
    showMyTransactions,
  };
};
