'use client';

import { Button } from '@/components/atoms/Button';
import SetAmount from '@/components/molecules/SetAmount';
import { TransferForm } from '@/contexts/TransferContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { MyAccount, OthersAccount } from '@/data/account';
import { bankList } from '@/data/bank';
import { MyAccountWithBalance } from '@/data/transfer';
import { convertKorToNum } from 'korean-number-converter';
import { useState, useEffect, useRef } from 'react';
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

export type HowMuchProps = {
  formData: TransferForm;
  fromAccount: MyAccountWithBalance;
  toAccount: MyAccount | OthersAccount;
  onNext: () => void;
  onUpdate: (data: WithAmountProps | WithoutAmountProps) => void;
};

export default function HowMuch({
  formData,
  fromAccount,
  toAccount,
  onNext,
  onUpdate,
}: HowMuchProps) {
  const amountRef = useRef<HTMLInputElement>(null);

  const [checkEverytime, setCheckEverytime] = useState(formData.checkEverytime);

  const [valid, setValid] = useState(
    formData.checkEverytime || formData.amount > 0
  );
  if (formData.type === 'WithAmount') console.log(formData);

  const toggleCheckEverytime = () => {
    setValid(!checkEverytime);
    setCheckEverytime((prev) => !prev);
  };

  const bankName = bankList.find(
    (bank) => bank.id === toAccount.bankId
  )?.bankname;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const money = e.target.value;
    setValid(Number(money.replaceAll(',', '')) > 0);
  };

  const handleSubmit = () => {
    if (checkEverytime) {
      onUpdate({ checkEverytime, type: 'WithoutAmount' });
      onNext();
    } else {
      const amountValue = amountRef.current?.value;
      if (amountValue) {
        const amount = parseInt(amountValue.replace(/,/g, ''), 10);
        onUpdate({
          checkEverytime,
          amount: amount,
          type: 'WithAmount',
        });
        onNext();
      } else {
        console.error('금액을 입력해주세요.');
      }
    }
  };

  const { result, setResult } = useVoiceInputSession();
  useEffect(() => {
    if (result) {
      const cleanedResult = result.replace(/[\s-]/g, '');
      const amountVal = convertKorToNum(cleanedResult);
      if (amountRef.current) {
        amountRef.current.value = amountVal.toLocaleString();
      }
      setValid(amountVal > 0);
      setResult('');
    }
  }, [result, setResult]);

  useEffect(() => {
    if (amountRef.current && formData.type === 'WithAmount') {
      if (formData.amount === 0) amountRef.current.value = '';
      else amountRef.current.value = formData.amount.toLocaleString();
      amountRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.type === 'WithAmount' && formData.amount]);

  return (
    <div className='flex flex-col gap-[24px]'>
      <div>
        <div className='text-[24px] font-semibold'>
          내 {fromAccount.accountName} 계좌에서
        </div>
        <div className='text-[12px] font-semibold'>
          잔액 {fromAccount.balance.toLocaleString()}원
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
          onChange={handleChange}
          amountRef={amountRef}
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
