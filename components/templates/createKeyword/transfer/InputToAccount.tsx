'use client';

import { Button } from '@/components/atoms/Button';
import { AccountInputRef } from '@/components/atoms/Inputs';
import SelectBank from '@/components/molecules/SelectBank';
import { TransferForm } from '@/contexts/TransferContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
import { MyAccount, OthersAccount } from '@/types/Account';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
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
  const { checkAccountUserName } = useAccountApi();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (id: number) => {
    setSelectedID(id);
  };

  const isInputFilled = inputValue.length > 0 && selectedID > 0;

  const handleAccountClick = () => {
    console.log(selectedID);
    const formattedAccountNum = formatAccountNumber(selectedID, inputValue);
    checkAccountUserName({
      accountNumber: formattedAccountNum,
      bankId: selectedID,
    }).then((res) => {
      const othersAccount: OthersAccount = {
        type: 'OthersAccount',
        bankId: selectedID,
        accountNumber: formattedAccountNum,
        name: res.name,
      };
      onUpdate(othersAccount);
      onNext();
    });
  };

  const accountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    accountRef.current?.focus();
  }, []);

  const { result } = useVoiceInputSession();

  useEffect(() => {
    if (result) {
      const cleanedResult = result.replace(/[\s-]/g, '');
      if (/^\d+$/.test(cleanedResult)) {
        const formattedAccountNum = formatAccountNumber(
          selectedID,
          cleanedResult
        );
        checkAccountUserName({
          accountNumber: formattedAccountNum,
          bankId: selectedID,
        }).then((res) => {
          console.log('🚀  useEffect  res:', res);
          const othersAccount: OthersAccount = {
            type: 'OthersAccount',
            bankId: selectedID,
            accountNumber: formattedAccountNum,
            name: res.name,
          };
          setInputValue(cleanedResult);
          onUpdate(othersAccount);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className='flex flex-col gap-[17px]'>
      <div>
        <h1 className='font-extrabold text-2xl'>어떤 계좌로 보낼까요?</h1>
      </div>
      <div>
        <AccountInputRef
          ref={accountRef}
          onChange={handleInputChange}
          placeHolder='계좌번호 입력'
          value={inputValue}
        />
        <SelectBank
          onSelect={handleSelect}
          value={formData.toAccount.bankId}
          useStt={true}
        />
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
