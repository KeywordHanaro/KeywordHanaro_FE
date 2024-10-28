'use client';

import { forwardRef } from 'react';
import { MoneyInputRef } from '../atoms/Inputs';
import { Toggle } from '../ui/toggle';

type SetAmountProps = {
  checkEverytime: boolean;
  toggleCheckEverytime: () => void;
  onChangeValidity: (valid: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value:string;
};

const SetAmount = forwardRef<HTMLInputElement, SetAmountProps>(
  ({ checkEverytime, toggleCheckEverytime, onChangeValidity, onChange, value}, ref) => {
    return (
      <div className='flex flex-col gap-6 w-full'>
        {!checkEverytime ? (
          <MoneyInputRef
            onChange={onChange}
            value={value}
            ref={ref}
            placeHolder='얼마를 요청할까요?'
            type=''
            onChangeValidity={onChangeValidity}
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
  }
);

SetAmount.displayName = 'SetAmount';

export default SetAmount;
