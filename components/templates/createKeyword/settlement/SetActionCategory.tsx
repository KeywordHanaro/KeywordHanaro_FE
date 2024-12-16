import { Button } from '@/components/atoms/Button';
import SetAmount from '@/components/molecules/SetAmount';
import { FormData } from '@/data/settlement';
import React, { useEffect, useRef, useState } from 'react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const money = e.target.value;
    setValid(Number(money.replaceAll(',', '')) > 0);
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
          내 {formData.fromAccount.accountName} 계좌로
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
        amountRef={amountRef}
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
