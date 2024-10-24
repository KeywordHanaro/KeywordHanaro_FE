'use client';

import React, { forwardRef } from 'react';
import { MoneyInputRef } from '../atoms/Inputs';
import { Toggle } from '../ui/toggle';

type SetAmountProps = {
  amountRef: React.RefObject<HTMLInputElement>;
  checkEverytime: boolean;
  toggleCheckEverytime: () => void;
};

const SetAmount = forwardRef<HTMLDivElement, SetAmountProps>(
  ({ amountRef, checkEverytime, toggleCheckEverytime }, ref) => {
    return (
      <div ref={ref} className='flex flex-col gap-6 w-full p-3'>
        <MoneyInputRef
          ref={amountRef}
          placeHolder='얼마를 요청할까요?'
          type=''
        />
        <div className='flex justify-between'>
          <span className='text-[15px]'>금액은 매번 정할게요</span>
          <Toggle
            checked={checkEverytime}
            onCheckedChange={toggleCheckEverytime}
          />
        </div>
      </div>
    );
  }
);

SetAmount.displayName = 'SetAmount';

export default SetAmount;
