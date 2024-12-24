'use client';

import SpeechToText from '@/components/SpeechToText';
import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { AccountInputRef, MoneyInputRef } from '@/components/atoms/Inputs';
import SelectBank from '@/components/molecules/SelectBank';
import SelectMyAccount from '@/components/molecules/SelectMyAccount';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { OthersAccount } from '@/types/Account';
import { MyAccount } from '@/types/Account';
import { convertKorToNum } from 'korean-number-converter';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState, useEffect } from 'react';
import { formatAccountNumber } from '@/lib/utils';

type TransferDocument = {
  myAccount: MyAccount;
  otherAccount: Omit<OthersAccount, 'name'>;
  amount: number;
};

export default function TransferDocumentPage() {
  const [transferDocument, setTransferDocument] = useState<TransferDocument>({
    myAccount: {} as MyAccount,
    otherAccount: {
      accountNumber: '',
      bankId: 0,
      type: 'OthersAccount',
    },
    amount: 0,
  });
  const [activeInput, setActiveInput] = useState<'account' | 'amount' | null>(
    null
  );

  const router = useRouter();
  const otherAccountRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const { result, resetResult } = useVoiceInputSession();

  // 음성 입력 결과 처리
  useEffect(() => {
    if (!result) return;

    if (activeInput === 'account' && otherAccountRef.current) {
      const value = result.replace(/[^0-9-]/g, '');
      otherAccountRef.current.value = value;
      setTransferDocument((prev) => ({
        ...prev,
        otherAccount: {
          ...prev.otherAccount,
          accountNumber: formatAccountNumber(prev.otherAccount.bankId, value),
        },
      }));
    } else if (activeInput === 'amount' && amountRef.current) {
      const numericAmount = result.replace(/[^0-9]/g, '');
      const amountVal = convertKorToNum(numericAmount);
      amountRef.current.value = amountVal.toLocaleString();
      const amount = parseInt(numericAmount, 10);
      setTransferDocument((prev) => ({ ...prev, amount }));
    }
    setActiveInput(null);
    resetResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const handleInputFocus = (inputType: 'account' | 'amount') => {
    setActiveInput(inputType);
  };

  const handleMyAccountSelect = useCallback((account: MyAccount) => {
    setTransferDocument((prev) => ({ ...prev, myAccount: account }));
  }, []);

  const handleAccountInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedAccount = formatAccountNumber(
        transferDocument.otherAccount.bankId,
        e.target.value
      );
      setTransferDocument((prev) => ({
        ...prev,
        otherAccount: {
          ...prev.otherAccount,
          accountNumber: formattedAccount,
          name: prev.myAccount.accountName,
        },
      }));
    },
    [transferDocument]
  );

  const handleSelectBank = useCallback((bankId: number) => {
    setTransferDocument((prev) => ({
      ...prev,
      otherAccount: { ...prev?.otherAccount, bankId },
    }));
  }, []);

  const onChangeAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const amount = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
      setTransferDocument((prev) => ({ ...prev, amount }));
    },
    []
  );

  const isTransferDocumentValid = (doc: TransferDocument): boolean => {
    return (
      Object.keys(doc.myAccount).length > 0 &&
      doc.otherAccount.accountNumber !== '' &&
      doc.otherAccount.bankId > 0 &&
      doc.amount > 0
    );
  };

  return (
    <>
      <div>
        <Header text='송금 서류 미리 작성하기' showActionButton={false} />
        <div className='p-4 flex flex-col gap-6'>
          <h1 className='text-[24px] font-semibold'>송금 서류 미리 작성하기</h1>

          <div className='flex flex-col'>
            <strong>보낼 계좌</strong>
            <SelectMyAccount onSelect={handleMyAccountSelect} />
          </div>
          <div>
            <strong>받는 계좌</strong>
            <AccountInputRef
              onChange={handleAccountInput}
              placeHolder='계좌번호 입력'
              ref={otherAccountRef}
              onFocus={() => handleInputFocus('account')}
            />
            <SelectBank onSelect={handleSelectBank} useStt={false} />
          </div>
          <div className='flex flex-col w-full'>
            <strong>입금 금액</strong>
            <span className='border-b'>
              <MoneyInputRef
                placeHolder='금액을 입력하세요'
                ref={amountRef}
                onChange={onChangeAmount}
                onFocus={() => handleInputFocus('amount')}
              />
            </span>
          </div>
          <Button
            onClick={() =>
              router.push('/document?task=송금&bank=하나은행 성수점')
            }
            className='w-full'
            isDisabled={!isTransferDocumentValid(transferDocument)}
          >
            완료
          </Button>
        </div>
        {activeInput && (
          <SpeechToText
            autoStart
            placeholder={
              activeInput === 'account'
                ? '계좌를 말씀해주세요.'
                : '금액을 말씀해주세요.'
            }
          />
        )}
      </div>
    </>
  );
}
