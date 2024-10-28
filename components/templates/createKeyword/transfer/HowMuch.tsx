'use client';

import { Button } from '@/components/atoms/Button';
import {
  type MyAccountItemProps,
  type MyOrOthersAccountItemProps,
} from '@/components/molecules/AccountListItem';
import SetAmount from '@/components/molecules/SetAmount';
import { bankList } from '@/data/bank';
import { KeywordInputToOtherData } from '@/data/transfer';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type WithAmountProps = {
  checkEverytime: false;
  amount: number;
  type: 'WithAmount';
};

export type WithoutAmountProps = {
  checkEverytime: true;
  type: 'WithoutAmount';
};

type HowMuchProps = {
  fromAccount: MyAccountItemProps;
  toAccount: MyOrOthersAccountItemProps;
  onNext: () => void;
  onUpdate: (data: WithAmountProps | WithoutAmountProps) => void;
};

export default function HowMuch({
  fromAccount,
  toAccount,
  onNext,
  onUpdate,
}: HowMuchProps) {
  // TODO: 잔액 DB에서 조회
  const { balance } = KeywordInputToOtherData;

  const amountRef = useRef<HTMLInputElement>(null);

  const [checkEverytime, setCheckEverytime] = useState(false);
  const [valid, setValid] = useState(false);

  const toggleCheckEverytime = () => {
    setValid(!checkEverytime);
    setCheckEverytime((prev) => !prev);
  };

  const bankName = bankList.find(
    (bank) => bank.id === toAccount.bankId
  )?.bankname;

  const handleSubmit = () => {
    if (checkEverytime) {
      // 금액 매번
      onUpdate({ checkEverytime, type: 'WithoutAmount' });
      onNext();
    } else {
      const amountValue = amountRef.current?.value; // 현재 입력값 가져오기

      console.log('!!!!', amountValue);
      if (amountValue) {
        // amountValue가 유효한 경우
        const amount = parseInt(amountValue.replace(/,/g, ''), 10);
        onUpdate({ checkEverytime, amount, type: 'WithAmount' });
        onNext();
      } else {
        // amountRef가 유효하지 않을 경우 추가 처리
        console.error('금액을 입력해주세요.');
      }
    }
  };

  return (
    <div className='flex flex-col gap-[24px]'>
      <div>
        <div className='text-[24px] font-semibold'>
          내 {fromAccount.accountName} 계좌에서
        </div>
        <div className='text-[12px] font-semibold'>
          잔액 {balance.toLocaleString()}원
        </div>
      </div>
      <div>
        <div className='text-[24px] font-semibold'>
          {toAccount.type === 'MyAccount'
            ? toAccount.accountName + ' '
            : toAccount.name + '님 '}
          계좌로
        </div>
        <div className='text-[12px] font-semibold'>
          {bankName} {toAccount.accountNumber}
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
        <Button
          isDisabled={!valid}
          className={cn('w-full mt-[18px]')}
          onClick={handleSubmit}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
