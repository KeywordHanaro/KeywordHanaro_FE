'use client';

import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { convertKorToNum } from 'korean-number-converter';
import { useEffect } from 'react';
import { MoneyInputRef } from '../atoms/Inputs';
import { Toggle } from '../ui/toggle';

type SetAmountProps = {
  checkEverytime: boolean;
  toggleCheckEverytime: () => void;
  onChangeValidity: (valid: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  amountRef?: React.RefObject<HTMLInputElement>;
};

const SetAmount = ({
  checkEverytime,
  toggleCheckEverytime,
  onChangeValidity,
  onChange,
  amountRef,
}: SetAmountProps) => {
  const { result, setResult } = useVoiceInputSession();
  useEffect(() => {
    if (result) {
      const cleanedResult = result.replace(/[\s-]/g, '');
      const amountVal = convertKorToNum(cleanedResult);
      if (amountRef && amountRef.current) {
        amountRef.current.value = amountVal.toLocaleString();
      }
      onChangeValidity(amountVal > 0);
      setResult('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className='flex flex-col gap-6 w-full'>
      {!checkEverytime ? (
        <MoneyInputRef
          onChange={onChange}
          ref={amountRef}
          placeHolder='얼마를 요청할까요?'
        />
      ) : (
        <div className='text-subGray font-semibold h-[32px] text-[18px] flex items-center'>
          <div>금액은 키워드 호출 시 결정돼요</div>
        </div>
      )}
      <div className='flex justify-between'>
        <span className='text-[15px]'>금액은 매번 정할게요</span>
        <Toggle
          checked={checkEverytime}
          onCheckedChange={toggleCheckEverytime}
        />
      </div>
    </div>
  );
};
SetAmount.displayName = 'SetAmount';

export default SetAmount;
