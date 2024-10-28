'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { AccountInputRef, MoneyInputRef } from '@/components/atoms/Inputs';
import SelectBank from '@/components/molecules/SelectBank';
import SelectMyAccount from '@/components/molecules/SelectMyAccount';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function TransferDocumentPage() {
  const [myAccount, setMyAccount] = useState<string | null>(null);

  const [otherAccount, setOtherAccount] = useState<string | null>(null);
  const [bankId, setBankID] = useState<number>(0);
  const otherAccountRef = useRef<HTMLInputElement>(null);

  const [isValid, setIsValid] = useState<boolean>(false);
  const ammountRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSelectBank = (id: number) => {
    (() => id && setBankID(id))();
    setOtherAccount(otherAccountRef.current?.value ?? null);
  };
  return (
    <>
      <div>
        <Header text='송금 서류 미리 작성하기' showActionButton={false} />
        <div className='p-4 flex flex-col gap-6'>
          <h1 className='text-[28px] font-semibold'>송금 서류 미리 작성하기</h1>

          <div className='flex flex-col'>
            <strong>보낼 계좌</strong>
            <SelectMyAccount onSelect={setMyAccount} />
          </div>
          <div>
            <strong>받는 계좌</strong>
            <AccountInputRef
              onChange={() => handleSelectBank(0)}
              placeHolder='계좌번호 입력'
              ref={otherAccountRef}
            />
            <SelectBank onSelect={handleSelectBank} />
          </div>
          <div className='flex flex-col w-full'>
            <strong>입금 금액</strong>
            <span className='border-b'>
              <MoneyInputRef
                className='w-full '
                placeHolder='금액을 입력하세요'
                onChangeValidity={setIsValid}
                ref={ammountRef}
              />
            </span>
          </div>
          <Button
            onClick={() =>
              router.push('/document?task=송금&bank=하나은행 성수점')
              // console.log(isValid, myAccount, otherAccount, bankId)
            }
            className='w-full'
            isDisabled={!(isValid && myAccount && otherAccount && bankId)}
          >
            완료
          </Button>
        </div>
      </div>
    </>
  );
}
