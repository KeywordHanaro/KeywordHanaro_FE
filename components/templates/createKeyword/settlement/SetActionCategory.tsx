import { FormData } from '@/app/(routes)/keyword/create/settlement/page';
import { Button } from '@/components/atoms/Button';
import SetAmount from '@/components/molecules/SetAmount';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const SetActionCategory = ({
  formData,
  onUpdate,
  onNext,
}: {
  formData: FormData;
  onUpdate: (newData: FormData) => void;
  onNext: () => void;
}) => {
  const [category, setCategory] = useState<'Settlement' | 'Dues'>('Settlement');
  const [checkEveryTime, setCheckEverytime] = useState(false);
  const [display, setDisplay] = useState(false);

  const amountRef = useRef<HTMLInputElement>(null);

  const onClickCategory = (category: 'Settlement' | 'Dues') => {
    setCategory(category);
  };

  const toggleCheckEverytime = () => {
    setCheckEverytime((prev) => !prev);
  };

  const handleOnNext = () => {
    // formData.checkEveryTime = checkEveryTime;
    if (amountRef.current) {
      onUpdate({ ...formData, amount: amountRef.current.value, category });
    }
    onNext();
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-[5px]'>
        <Button
          className='w-full'
          size='sm'
          onClick={() => onClickCategory('Settlement')}
        >
          정산하기
        </Button>
        <Button
          className='w-full'
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
        ref={amountRef}
        checkEverytime={checkEveryTime}
        toggleCheckEverytime={toggleCheckEverytime}
        onChangeValidity={setDisplay}
      />
      <Button
        isDisabled={!display}
        className={cn('w-full mt-[18px]')}
        onClick={handleOnNext}
      >
        다음
      </Button>
    </div>
  );
};
export default SetActionCategory;
