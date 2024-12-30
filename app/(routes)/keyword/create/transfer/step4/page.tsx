'use client';

import SpeechToText from '@/components/SpeechToText';
import { Button } from '@/components/atoms/Button';
import SetAmount from '@/components/molecules/SetAmount';
import { useTransferForm } from '@/contexts/TransferContext';
import { bankList } from '@/data/bank';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Step4() {
  const router = useRouter();
  const { formData, updateFormData } = useTransferForm();
  const amountRef = useRef<HTMLInputElement>(null);

  const [checkEverytime, setCheckEverytime] = useState(formData.checkEverytime);

  const [valid, setValid] = useState(
    formData.checkEverytime || formData.amount > 0
  );

  const toggleCheckEverytime = () => {
    setValid(!checkEverytime);
    setCheckEverytime((prev) => !prev);
  };

  const bankName = bankList.find(
    (bank) => bank.id === formData.toAccount.bankId
  )?.bankname;

  const handleNext = () => {
    router.push('/keyword/create/transfer/step5');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const money = e.target.value;
    setValid(Number(money.replaceAll(',', '')) > 0);
  };

  const handleSubmit = () => {
    if (checkEverytime) {
      updateFormData({ checkEverytime, type: 'WithoutAmount' });
      handleNext();
    } else {
      const amountValue = amountRef.current?.value;
      if (amountValue) {
        const amount = parseInt(amountValue.replace(/,/g, ''), 10);
        updateFormData({
          checkEverytime,
          amount: amount,
          type: 'WithAmount',
        });
        handleNext();
      } else {
        console.error('금액을 입력해주세요.');
      }
    }
  };

  return (
    <div className='flex flex-col gap-[24px]'>
      <div>
        <div className='text-[24px] font-semibold'>
          내 {formData.fromAccount.accountName} 계좌에서
        </div>
        <div className='text-[12px] font-semibold'>
          잔액 {formData.fromAccount.balance.toLocaleString()}원
        </div>
      </div>
      <div>
        <div className='text-[24px] font-semibold'>
          {formData.toAccount.type === 'MyAccount'
            ? formData.toAccount.accountName + ' '
            : formData.toAccount.name + '님 '}
          계좌로
        </div>
        <div className='text-[12px] font-semibold'>
          {bankName} {formData.toAccount.accountNumber}
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
      <SpeechToText placeholder={'얼마를 보낼까요?'} autoStart />
    </div>
  );
}
