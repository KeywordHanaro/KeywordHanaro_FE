'use client';

import SpeechToText from '@/components/SpeechToText';
import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { MoneyInputRef } from '@/components/atoms/Inputs';
import SelectMyAccount from '@/components/molecules/SelectMyAccount';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { MyAccount } from '@/types/Account';
import { convertKorToNum } from 'korean-number-converter';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function WithdrawalDocumentPage() {
  const router = useRouter();
  const [myAccount, setMyAccount] = useState<MyAccount | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean>(false);
  const amountRef = useRef<HTMLInputElement>(null);

  const handleAccountSelect = (account: MyAccount) => {
    setMyAccount(account);
  };

  const { result } = useVoiceInputSession();

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, '');
    const numericValue = parseInt(inputValue, 10);
    if (
      !isNaN(numericValue) &&
      numericValue <= Number.MAX_SAFE_INTEGER &&
      amountRef.current
    ) {
      const formattedValue = new Intl.NumberFormat('ko-KR').format(
        numericValue
      );
      amountRef.current.value = formattedValue;
    }
    setIsValid(numericValue > 0 && myAccount !== undefined);
  };

  useEffect(() => {
    if (result && amountRef.current) {
      const cleanedResult = result.replace(/[\s-]/g, '');
      const amountVal = convertKorToNum(cleanedResult);
      if (amountVal) {
        amountRef.current.value = amountVal.toLocaleString();
        setIsValid(amountVal > 0 && myAccount !== undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <>
      <div>
        <Header text='출금 서류 미리 작성하기' showActionButton={false} />
        <div className='p-4 flex flex-col gap-6'>
          <h1 className='text-[24px] font-semibold'>출금 서류 미리 작성하기</h1>

          <div className='flex flex-col'>
            <strong>출금 계좌</strong>
            <SelectMyAccount onSelect={handleAccountSelect} />
          </div>
          <div className='flex flex-col w-full'>
            <strong>출금 금액</strong>
            <span className='border-b'>
              <MoneyInputRef
                placeHolder='금액을 입력하세요'
                onChange={onChangeAmount}
                ref={amountRef}
              />
            </span>
          </div>
          <Button
            onClick={() =>
              router.push('/document?task=출금&bank=하나은행 성수점')
            }
            className='w-full'
            isDisabled={!(isValid && myAccount)}
          >
            완료
          </Button>
        </div>
        <SpeechToText placeholder='금액을 말씀해주세요' />
      </div>
    </>
  );
}
