'use client';

import { Button } from '@/components/atoms/Button';
import { AccountInputRef } from '@/components/atoms/Inputs';
import SelectBank from '@/components/molecules/SelectBank';
import { TransferForm } from '@/contexts/TransferContext';
import { MyAccount, OthersAccount } from '@/data/account';
import { ChangeEvent, useState } from 'react';
import { formatAccountNumber } from '@/lib/utils';

type InputToAccountProps = {
  formData: TransferForm;
  onUpdate: (account: MyAccount | OthersAccount) => void;
  onNext: () => void;
};

export default function InputToAccount({
  formData,
  onUpdate,
  onNext,
}: InputToAccountProps) {
  const [inputValue, setInputValue] = useState(
    formData.toAccount.accountNumber
  );
  const [selectedID, setSelectedID] = useState<number>(
    formData.toAccount.bankId
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (id: number) => {
    setSelectedID(id);
  };

  const isInputFilled = inputValue.length > 0 && selectedID > 0;

  const handleAccountClick = () => {
    const formattedAccountNum = formatAccountNumber(selectedID, inputValue);
    onUpdate({
      type: 'OthersAccount',
      bankId: selectedID,
      accountNumber: formattedAccountNum,
      name: 'OOO', //TODO: 예금주성명 조회 api 필요
    });
    onNext();
  };

  return (
    <div className='flex flex-col gap-[17px]'>
      <div>
        <h1 className='font-extrabold text-2xl'>어떤 계좌로 보낼까요?</h1>
      </div>
      <div>
        <AccountInputRef
          onChange={handleInputChange}
          placeHolder='계좌번호 입력'
          value={inputValue}
        />
        <SelectBank onSelect={handleSelect} value={formData.toAccount.bankId} />
      </div>
      <Button
        onClick={handleAccountClick}
        isDisabled={!isInputFilled}
        className='w-full mt-[18px]'
      >
        다음
      </Button>
    </div>
  );
}
