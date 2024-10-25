'use client';

import { Button } from '@/components/atoms/Button';
import SetAmount from '@/components/molecules/SetAmount';
import { KeywordInputToOtherData } from '@/data/transfer';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export default function HowMuch() {
  // TODO: page에서 수정
  const { fromAccountName, balance, toName, bankName, toAccountNumber } =
    KeywordInputToOtherData;

  const amountRef = useRef<HTMLInputElement>(null);

  const [checkEverytime, setCheckEverytime] = useState(false);
  const [valid, setValid] = useState(false);

  const toggleCheckEverytime = () => {
    setValid(!checkEverytime);
    setCheckEverytime((prev) => !prev);
  };

  return (
    <div className='flex flex-col gap-[24px]'>
      <div>
        <div className='text-[24px] font-semibold'>
          내 {fromAccountName}에서
        </div>
        <div className='text-[12px] font-semibold'>잔액 {balance}원</div>
      </div>
      <div>
        <div className='text-[24px] font-semibold'>{toName} 계좌로</div>
        <div className='text-[12px] font-semibold'>
          {bankName} {toAccountNumber}
        </div>
      </div>
      <div>
        <SetAmount
          ref={amountRef}
          checkEverytime={checkEverytime}
          toggleCheckEverytime={toggleCheckEverytime}
          onChangeValidity={setValid}
        />
      </div>
      <div>
        <Button isDisabled={!valid} className={cn('w-full mt-[18px]')}>
          다음
        </Button>
      </div>
    </div>
  );
}
