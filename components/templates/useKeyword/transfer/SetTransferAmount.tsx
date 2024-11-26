import { Button } from '@/components/atoms/Button';
import { MoneyInputRef } from '@/components/atoms/Inputs';
import InputPassword from '@/components/molecules/InputPassword';
import { TransferProps } from '@/data/transfer';
import { useState, useEffect, forwardRef } from 'react';
import { formatNumberWithCommas } from '@/lib/utils';

export type SetTransferAmountProps = {
  data: TransferProps;
  onNext: () => void;
};

export const SetTransferAmount = forwardRef<
  HTMLInputElement,
  SetTransferAmountProps
>(({ data, onNext }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  //[new]
  const checkPassword = () => {
    setVerified(true);
    setOpen(false);
    onNext();
  };

  const validatePassword = async (password: number[]): Promise<boolean> => {
    try {
      const response = await fetch('/api/validate-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      return data.isValid; // Assume API returns { isValid: boolean }
    } catch (error) {
      console.error('Error validating password:', error);
      return false; // Default to invalid on error
    }
  };

  useEffect(() => {
    if (data.type === 'WithoutAmount') {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [data.type]);

  const handleNextClick = () => {
    if (verified) {
      onNext();
    } else if (data.type === 'WithAmount' || data.type === 'WithoutAmount') {
      setOpen(true);
    }
  };
  return (
    <div className='flex flex-col justify-between p-[20px] w-full h-full '>
      <div className='flex flex-col gap-6'>
        <div>
          <div className='text-[24px] font-semibold'>
            내 {data.fromAccount.accountName} 계좌에서
          </div>
          <div className='text-[12px] font-semibold'>
            잔액 {data.fromAccount.balance.toLocaleString()}원
          </div>
        </div>

        <div>
          <div className='text-[24px] font-semibold'>
            {data.toAccount.type === 'MyAccount'
              ? data.toAccount.accountName + ' '
              : data.toAccount.name + '님 '}
            계좌로
          </div>
          <div className='text-[12px] font-semibold'>
            {data.toAccount.accountNumber}
          </div>
        </div>
        {data.type === 'WithoutAmount' ? (
          <MoneyInputRef ref={ref} placeHolder='얼마를 요청할까요?' />
        ) : (
          //withAmount는 input 비활성화
          <div className='text-hanaPrimary font-semibold h-[32px] text-[24px] flex items-center'>
            <div>
              {data.type === 'WithAmount' &&
                `${formatNumberWithCommas(String(data.amount))}원`}
            </div>
          </div>
        )}
      </div>
      <div className='absolute bottom-0 '>
        {!verified && open && (
          <InputPassword
            onSubmit={checkPassword}
            validatePassword={validatePassword}
            open={open}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
      <Button onClick={handleNextClick} className='w-full'>
        다음
      </Button>
    </div>
  );
});
SetTransferAmount.displayName = 'SetTransferAmount';
export default SetTransferAmount;
