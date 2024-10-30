import { FormData } from '@/app/(routes)/keyword/create/settlement/page';
import { Button } from '@/components/atoms/Button';
import SetAmount from '@/components/molecules/SetAmount';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SetActionCategoryProps {
  formData: FormData;
  onUpdate: (newData: FormData) => void;
  onNext: () => void;
}

const SetActionCategory = ({
  formData,
  onUpdate,
  onNext,
}: SetActionCategoryProps) => {
  const [category, setCategory] = useState<'Settlement' | 'Dues'>(
    formData.category
  );
  const [checkEveryTime, setCheckEverytime] = useState<boolean>(
    formData.checkEveryTime
  );
  const [amount, setAmount] = useState(formData.amount);
  const [valid, setValid] = useState<boolean>(
    formData.checkEveryTime || formData.amount.length > 0
  );

  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (amountRef.current) {
      console.log(amount);
      amountRef.current.value = formData.amount;
      amountRef.current.focus();
    }
  }, [amount, formData.amount]);

  const onClickCategory = (category: 'Settlement' | 'Dues') => {
    setCategory(category);
  };

  const toggleCheckEverytime = () => {
    setValid(!checkEveryTime);
    setAmount('');
    setCheckEverytime((prev) => !prev);
  };

  const formatNumberWithCommas = useCallback((inputValue: string): string => {
    if (!inputValue) return '';
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const parsedValue = numericValue ? parseInt(numericValue, 10) : 0;
    return new Intl.NumberFormat('ko-KR').format(parsedValue);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const money = e.target.value;
    const formatData = formatNumberWithCommas(money);
    setAmount(formatData);
  };

  const handleOnNext = () => {
    if (amountRef.current) {
      if (checkEveryTime) amountRef.current.value = '';
      onUpdate({
        ...formData,
        amount: amountRef.current.value,
        category,
        checkEveryTime,
      });
    } else {
      onUpdate({ ...formData, amount: '', category, checkEveryTime });
    }
    onNext();
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-2'>
        <Button
          className={`w-full ${category !== 'Settlement' && 'bg-ToggleBgWhite text-black'}`}
          size='sm'
          onClick={() => onClickCategory('Settlement')}
        >
          정산하기
        </Button>
        <Button
          className={`w-full ${category !== 'Dues' && 'bg-ToggleBgWhite text-black'}`}
          size='sm'
          onClick={() => onClickCategory('Dues')}
        >
          회비 걷기
        </Button>
      </div>
      <div className='flex flex-col gap-6'>
        <span className='font-semibold text-[24px]'>
          내 {formData.account.accountName} 계좌로
        </span>
        <div className='font-semibold text-[24px] justify-center items-center'>
          {formData.members.map((member, idx) => (
            <span key={member.id} className='text-hanaPrimary mr-[3px]'>
              {member.name}
              {idx !== formData.members.length - 1 ? ',' : ''}
            </span>
          ))}
          <span>
            님에게 {category === 'Settlement' ? '정산' : '회비'} 요청 할게요
          </span>
        </div>
      </div>
      <SetAmount
        onChange={handleChange}
        value={amount}
        ref={amountRef}
        checkEverytime={checkEveryTime}
        toggleCheckEverytime={toggleCheckEverytime}
        onChangeValidity={setValid}
      />
      <Button
        isDisabled={!valid}
        className={cn('w-full mt-[18px]')}
        onClick={handleOnNext}
      >
        다음
      </Button>
    </div>
  );
};

SetActionCategory.displayName = 'SetActionCategory';

export default SetActionCategory;
