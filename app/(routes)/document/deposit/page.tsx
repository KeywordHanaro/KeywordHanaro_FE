'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { MoneyInputRef } from '@/components/atoms/Inputs';
import SelectMyAccount from '@/components/molecules/SelectMyAccount';
import { MyAccount } from '@/data/account';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function DepositDocumentPage() {
  const router = useRouter();
  const [myAccount, setMyAccount] = useState<MyAccount | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean>(false);
  const ammountRef = useRef<HTMLInputElement>(null);

  const handleAccountSelect = (account: MyAccount) => {
    setMyAccount(account);
  };

  return (
    <>
      <div>
        <Header text='입금 서류 미리 작성하기' showActionButton={false} />
        <div className='p-4 flex flex-col gap-6'>
          <h1 className='text-[28px] font-semibold'>입금 서류 미리 작성하기</h1>

          <div className='flex flex-col'>
            <strong>입금 계좌</strong>
            <SelectMyAccount onSelect={handleAccountSelect} />
          </div>
          <div className='flex flex-col w-full'>
            <strong>입금 금액</strong>
            <span className='border-b'>
              <MoneyInputRef
                className='w-full'
                placeHolder='금액을 입력하세요'
                onChangeValidity={setIsValid}
                ref={ammountRef}
              />
            </span>
          </div>
          <Button
            onClick={() =>
              router.push('/document?task=입금&bank=하나은행 성수점')
            }
            className='w-full'
            isDisabled={!(isValid && myAccount)}
          >
            완료
          </Button>
        </div>
      </div>
    </>
  );
}
