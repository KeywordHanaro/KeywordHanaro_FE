'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { AccountInputRef, KeywordInputRef } from '@/components/atoms/Inputs';
import SelectBank from '@/components/molecules/SelectBank';
import SelectMyAccount from '@/components/molecules/SelectMyAccount';
import SetAmount from '@/components/molecules/SetAmount';
import { Toggle } from '@/components/ui/toggle';
import { MyAccount, OthersAccount } from '@/data/account';
import {
  KeywordDetailList,
  TransferAmountKeyword,
  TransferKeyword,
} from '@/data/keyword';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { formatNumberWithCommas } from '@/lib/utils';

export default function EditTransferKeyword() {
  const router = useRouter();
  const keyword = KeywordDetailList[2] as
    | TransferKeyword
    | TransferAmountKeyword;

  const [keywordTitle, setKeywordTitle] = useState(keyword.title);
  const [myAccount, setMyAccount] = useState<MyAccount | undefined>(
    keyword.accountFrom as MyAccount
  );
  const [otherAccount, setOtherAccount] = useState<
    MyAccount | OthersAccount | undefined
  >(keyword.accountTo);
  const [transferToMe, setTransferToMe] = useState(
    keyword.accountTo.type === 'MyAccount'
  );
  const [amount, setAmount] = useState<string>(
    keyword.type === 'transferAmount'
      ? formatNumberWithCommas(keyword.amount)
      : ''
  );
  const [checkEverytime, setCheckEverytime] = useState(
    keyword.type !== 'transferAmount'
  );
  const [isValid, setIsValid] = useState<boolean>(
    keyword.type === 'transferAmount'
  );

  const keywordNameRef = useRef<HTMLInputElement>(null);
  const otherAccountRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeywordTitle(e.target.value);
  }, []);

  const toggleTransfer = useCallback(() => {
    setTransferToMe((prev) => !prev);
    setOtherAccount(undefined);
  }, []);

  const handleAccountInput = useCallback(() => {
    if (otherAccountRef.current) {
      setOtherAccount({
        type: 'OthersAccount',
        name: '',
        bankId: 0,
        accountNumber: otherAccountRef.current.value,
      });
    }
  }, []);

  const handleSelectBank = useCallback((id: number) => {
    setOtherAccount((prev) =>
      prev?.type === 'OthersAccount'
        ? { ...prev, bankId: id }
        : { type: 'OthersAccount', name: '', bankId: id, accountNumber: '' }
    );
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatNumberWithCommas(e.target.value));
  }, []);

  const toggleCheckEverytime = useCallback(() => {
    setCheckEverytime((prev) => !prev);
    setAmount('');
    setIsValid((prev) => !prev);
  }, []);

  const onComplete = useCallback(() => {
    if (myAccount && otherAccount) {
      const updatedFormData = {
        id: keyword.id,
        title: keywordTitle,
        accountFrom: myAccount,
        accountTo: otherAccount,
        ...(checkEverytime
          ? { type: 'transfer' as const }
          : { type: 'transferAmount' as const, amount }),
      };

      console.log('Sending data to server:', updatedFormData);
      router.back();
    }
  }, [
    keywordTitle,
    myAccount,
    otherAccount,
    checkEverytime,
    amount,
    keyword.id,
    router,
  ]);

  const isButtonDisabled = useMemo(() => {
    const isDataChanged =
      keywordTitle !== keyword.title ||
      myAccount !== keyword.accountFrom ||
      otherAccount !== keyword.accountTo ||
      checkEverytime !== (keyword.type === 'transfer') ||
      (!checkEverytime &&
        keyword.type === 'transferAmount' &&
        amount !== formatNumberWithCommas(keyword.amount));

    const isAccountValid =
      myAccount?.type === 'MyAccount' &&
      'bankId' in myAccount &&
      'accountNumber' in myAccount &&
      ((otherAccount?.type === 'MyAccount' &&
        'bankId' in otherAccount &&
        'accountNumber' in otherAccount) ||
        (otherAccount?.type === 'OthersAccount' &&
          otherAccount.bankId !== 0 &&
          otherAccount.accountNumber !== ''));

    const isAmountValid =
      checkEverytime || (!checkEverytime && amount !== '' && isValid);

    return !(isDataChanged && isAccountValid && isAmountValid);
  }, [
    keywordTitle,
    myAccount,
    otherAccount,
    checkEverytime,
    amount,
    keyword,
    isValid,
  ]);

  return (
    <div className='flex flex-col h-full'>
      <Header text='키워드 수정하기' showActionButton={false} />
      <div className='flex flex-col justify-between gap-6 p-[20px] h-full'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col'>
            <strong>키워드명</strong>
            <KeywordInputRef
              className='text-hanaPrimary w-full'
              placeHolder={keyword.title}
              onChange={handleInputChange}
              defaultValue={keyword.title}
              ref={keywordNameRef}
            />
          </div>
          <div className='flex flex-col'>
            <strong>보낼 계좌</strong>
            <SelectMyAccount
              selected={myAccount?.type === 'MyAccount' ? myAccount : undefined}
              onSelect={setMyAccount}
            />
          </div>
          <div>
            <div className='flex w-full justify-between'>
              <strong>받는 계좌</strong>
              <div className='flex gap-2 items-center text-sm'>
                <span>내게 보내기</span>
                <Toggle
                  checked={transferToMe}
                  onCheckedChange={toggleTransfer}
                />
              </div>
            </div>
            {transferToMe ? (
              <SelectMyAccount
                selected={
                  otherAccount?.type === 'MyAccount' ? otherAccount : undefined
                }
                onSelect={setOtherAccount}
              />
            ) : (
              <>
                <AccountInputRef
                  onChange={handleAccountInput}
                  placeHolder='계좌번호 입력'
                  ref={otherAccountRef}
                />
                <SelectBank onSelect={handleSelectBank} />
              </>
            )}
          </div>
          <div className='flex flex-col w-full gap-2'>
            <strong>송금 금액</strong>
            <SetAmount
              onChange={handleChange}
              ref={amountRef}
              value={amount}
              checkEverytime={checkEverytime}
              toggleCheckEverytime={toggleCheckEverytime}
              onChangeValidity={setIsValid}
            />
          </div>

          <Button
            onClick={onComplete}
            className='w-full'
            isDisabled={isButtonDisabled}
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  );
}
