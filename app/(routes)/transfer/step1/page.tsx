'use client';

import Header from '@/components/atoms/Header';
import SetTransferAmount from '@/components/templates/useKeyword/transfer/SetTransferAmount';
import { useTransferUseSession } from '@/contexts/TransferUseContext';
import { VoiceInputProvider } from '@/contexts/VoiceContext';
// import { UseKeywordTransfer } from '@/data/transfer';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { MyAccount, OthersAccount } from '@/types/Account';
// import { TransferUsageResponse } from '@/types/Keyword';
import {
  MyAccountWithBalance,
  TransferData,
  TransferProps,
} from '@/types/Transfer';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function SetTransferAmountPage() {
  const { formData, saveFormData } = useTransferUseSession();
  const searchParams = useSearchParams();
  const { transfer } = useAccountApi();
  const { getKeywordById } = useKeywordApi();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setIsLoading(true);
      getKeywordById(Number(id))
        .then((data) => {
          if (data.type === 'TRANSFER') {
            const fromAccount: MyAccountWithBalance = {
              type: 'MyAccount',
              accountName: data.account.name,
              bankId: data.account.bank.id,
              accountId: data.account.id,
              accountNumber: data.account.accountNumber,
              balance: data.account.balance.toString(),
            };

            let toAccount: OthersAccount | MyAccount;
            if (data.user.id === data.subAccount.user.id) {
              toAccount = {
                type: 'MyAccount',
                accountName: data.subAccount.name,
                bankId: data.subAccount.bank.id,
                accountId: data.subAccount.id,
                accountNumber: data.subAccount.accountNumber,
              };
            } else {
              toAccount = {
                type: 'OthersAccount',
                name: data.subAccount.user.name,
                bankId: data.subAccount.bank.id,
                accountNumber: data.subAccount.accountNumber,
              };
            }
            saveFormData({
              ...formData,
              type: data.checkEveryTime ? 'WithoutAmount' : 'WithAmount',
              fromAccount: fromAccount,
              toAccount: toAccount,
              checkEverytime: data.checkEveryTime,
              amount: data.checkEveryTime ? 0 : data.amount,
              keyword: data.name,
            } as TransferProps);
          }
        })
        .catch((error) => {
          console.error('Error fetching keyword data:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const router = useRouter();

  const amountRef = useRef<HTMLInputElement>(null);

  const onNext = async () => {
    saveFormData({
      ...formData,
      amount: parseFloat((amountRef.current?.value || '0').replace(/,/g, '')),
    });
    const transferData: TransferData = {
      fromAccountNumber: formData.fromAccount.accountNumber,
      toAccountNumber: formData.toAccount.accountNumber,
      amount: parseFloat((amountRef.current?.value || '0').replace(/,/g, '')),
    };
    await transfer(transferData)
      .then(() => {
        router.push('/transfer/step2');
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const handleBack = () => {
    router.back();
  };
  return (
    <div className='flex flex-col w-full h-full'>
      <Header
        text='키워드 송금'
        showBackButton={true}
        showActionButton={false}
        onBack={handleBack}
      />
      <VoiceInputProvider>
        {!isLoading && (
          <SetTransferAmount data={formData} onNext={onNext} ref={amountRef} />
        )}
      </VoiceInputProvider>
    </div>
  );
}
