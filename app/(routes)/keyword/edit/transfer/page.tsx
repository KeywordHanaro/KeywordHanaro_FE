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
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { formatNumberWithCommas } from '@/lib/utils';

export default function EditTransferKeyword() {
  const router = useRouter();

  const keyword = KeywordDetailList[2] as
    | TransferKeyword
    | TransferAmountKeyword;

  const [formData, setFormData] = useState<
    TransferKeyword | TransferAmountKeyword
  >(keyword);

  // keyword명 설정
  const [keywordTitle, setKeywordTitle] = useState(keyword.title);
  const keywordNameRef = useRef<HTMLInputElement>(null);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setKeywordTitle(newTitle);
  };

  // 보내는 계좌(FROM) 설정
  const [myAccount, setMyAccount] = useState<MyAccount | undefined>(
    keyword.accountFrom as MyAccount
  );

  // 보낼 계좌(TO) 설정
  const [otherAccount, setOtherAccount] = useState<
    MyAccount | OthersAccount | undefined
  >(keyword.accountTo);
  const otherAccountRef = useRef<HTMLInputElement>(null);
  const [transferToMe, setTransferToMe] = useState(
    keyword.accountTo.type === 'MyAccount'
  );
  const toggleTransfer = () => {
    setTransferToMe((prev) => !prev);
    setOtherAccount(undefined);
  };
  const handleAccountInput = () => {
    if (otherAccountRef.current) {
      const newOtherAccount: OthersAccount = {
        type: 'OthersAccount',
        name: '',
        bankId: 0,
        accountNumber: otherAccountRef.current.value,
      };
      setOtherAccount(newOtherAccount);
    }
  };
  const handleSelectBank = (id: number) => {
    if (otherAccount?.type === 'OthersAccount') {
      const newOtherAccount: OthersAccount = {
        ...otherAccount,
        bankId: id,
      };
      setOtherAccount(newOtherAccount);
    } else {
      const newOtherAccount: OthersAccount = {
        type: 'OthersAccount',
        name: '',
        bankId: id,
        accountNumber: '',
      };
      setOtherAccount(newOtherAccount);
    }
  };

  // 금액 설정
  const [amount, setAmount] = useState<string>(
    keyword.type === 'transferAmount'
      ? formatNumberWithCommas(keyword.amount)
      : ''
  );
  const amountRef = useRef<HTMLInputElement>(null);
  const [checkEverytime, setCheckEverytime] = useState(
    keyword.type !== 'transferAmount'
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const money = e.target.value;
    const formatData = formatNumberWithCommas(money);
    setAmount(formatData);
  };

  const [isValid, setIsValid] = useState<boolean>(
    keyword.type === 'transferAmount'
  );

  const toggleCheckEverytime = () => {
    if (!amount) {
      setIsValid(!checkEverytime);
    }
    setCheckEverytime((prev) => !prev);
  };

  const onComplete = () => {
    if (myAccount && otherAccount) {
      const baseData = {
        id: formData.id,
        title: keywordTitle,
        accountFrom: myAccount,
        accountTo: otherAccount,
      };

      let updatedFormData: TransferKeyword | TransferAmountKeyword;

      if (checkEverytime) {
        updatedFormData = {
          ...baseData,
          type: 'transfer',
        } as TransferKeyword;
      } else {
        updatedFormData = {
          ...baseData,
          type: 'transferAmount',
          amount: amount,
        } as TransferAmountKeyword;
      }

      setFormData(updatedFormData);
      console.log('Sending data to server:', updatedFormData);
      // router.back();
    } else {
      console.error('myAccount or otherAccount is undefined');
    }
  };

  function isTransferAmountKeyword(
    keyword: TransferKeyword | TransferAmountKeyword
  ): keyword is TransferAmountKeyword {
    return (keyword as TransferAmountKeyword).amount !== undefined;
  }
  console.log('formData', formData);
  console.log('myAccount', myAccount);
  console.log('otherAccount', otherAccount);

  // useEffect(() => {
  //   setOtherAccount(undefined);
  // }, [transferToMe]);

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
              selected={
                myAccount && myAccount.type === 'MyAccount'
                  ? myAccount
                  : undefined
              }
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
              onChangeValidity={(isValid) => {
                setIsValid(isValid);
              }}
            />
          </div>

          <Button
            onClick={onComplete}
            className='w-full'
            isDisabled={
              keywordTitle === formData.title &&
              myAccount === formData.accountFrom &&
              (otherAccount === undefined ||
                otherAccount === formData.accountTo ||
                (transferToMe
                  ? otherAccount?.type !== 'MyAccount'
                  : otherAccount?.type !== 'OthersAccount' ||
                    otherAccount.accountNumber === '' ||
                    otherAccount.bankId === 0)) &&
              (keyword.type === 'transfer'
                ? checkEverytime
                : isTransferAmountKeyword(formData) &&
                  !checkEverytime &&
                  amount === formatNumberWithCommas(formData.amount))
            }
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  );
}
