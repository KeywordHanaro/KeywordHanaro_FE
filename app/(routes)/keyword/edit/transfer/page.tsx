'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { AccountInputRef, KeywordInputRef } from '@/components/atoms/Inputs';
import SelectBank from '@/components/molecules/SelectBank';
import SelectMyAccount from '@/components/molecules/SelectMyAccount';
import SetAmount from '@/components/molecules/SetAmount';
import { Toggle } from '@/components/ui/toggle';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { OthersAccount } from '@/types/Account';
import { MyAccount } from '@/types/Account';
import { TransferUsageResponse } from '@/types/Keyword';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { formatNumberWithCommas } from '@/lib/utils';

export default function EditTransferKeyword() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params?.get('id');

  const { getKeywordById, updateKeyword } = useKeywordApi();
  const [initialKeyword, setInitialKeyword] = useState<TransferUsageResponse>();

  useEffect(() => {
    if (id) {
      getKeywordById(parseInt(id))
        .then((res) => {
          console.log('🚀  .then  res:', res);
          if (res.type !== 'TRANSFER') return;
          setInitialKeyword(res);
          setKeywordTitle(res.name);
          setMyAccount({
            type: 'MyAccount',
            accountName: res.account.name,
            bankId: res.account.bank.id,
            accountId: res.account.id,
            accountNumber: res.account.accountNumber,
          });
          if (res.account.user.id === res.subAccount.user.id) {
            setOtherAccount({
              type: 'MyAccount',
              accountName: res.subAccount.name,
              accountId: res.subAccount.id,
              bankId: res.subAccount.bank.id,
              accountNumber: res.subAccount.accountNumber,
            });
            setTransferToMe(true);
          } else {
            setOtherAccount({
              type: 'OthersAccount',
              name: res.subAccount.name,
              bankId: res.subAccount.bank.id,
              accountNumber: res.subAccount.accountNumber,
            });
            setTransferToMe(false);
          }
          if (!res.checkEveryTime && res.amount) {
            setAmount(res.amount.toLocaleString());
            if (amountRef.current)
              amountRef.current.value = res.amount.toLocaleString();
          }
          setCheckEverytime(res.checkEveryTime);
        })
        .catch((error) => {
          console.error('거래 내역 가져오기 실패:', error);
        });
    }
  }, [id]);

  const [keywordTitle, setKeywordTitle] = useState<string>(
    initialKeyword?.name || ''
  );
  const [myAccount, setMyAccount] = useState<MyAccount | undefined>();
  const [otherAccount, setOtherAccount] = useState<
    MyAccount | OthersAccount | undefined
  >();

  const [transferToMe, setTransferToMe] = useState(
    initialKeyword?.account.user.id === initialKeyword?.subAccount.user.id
  );
  const [amount, setAmount] = useState<string>(
    initialKeyword?.checkEveryTime
      ? ''
      : initialKeyword?.amount?.toString() || ''
  );
  const [checkEverytime, setCheckEverytime] = useState<boolean>(
    initialKeyword?.checkEveryTime || false
  );
  const [isValid, setIsValid] = useState<boolean>(
    initialKeyword?.checkEveryTime || false
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

  const createDesc = (
    myAccount: MyAccount,
    otherAccount: MyAccount | OthersAccount,
    checkEveryTime: boolean,
    amount?: number
  ): string => {
    if (checkEveryTime) {
      return (
        myAccount?.accountName +
        ' > ' +
        otherAccount.accountNumber +
        ' > 금액 미정'
      );
    } else {
      return (
        myAccount?.accountName +
        ' > ' +
        otherAccount.accountNumber +
        ' > ' +
        amount
      );
    }
  };

  const onComplete = useCallback(async () => {
    if (myAccount && otherAccount) {
      await updateKeyword(Number(id), {
        type: 'TRANSFER',
        name: keywordTitle,
        account: { id: myAccount.accountId },
        subAccount: { accountNumber: otherAccount.accountNumber },
        checkEveryTime: checkEverytime,
        amount: checkEverytime ? undefined : Number(amount.replace(/,/g, '')),
        desc: createDesc(
          myAccount,
          otherAccount,
          checkEverytime,
          Number(amount.replace(/,/g, ''))
        ),
      });
      router.back();
    }
  }, [
    keywordTitle,
    myAccount,
    otherAccount,
    checkEverytime,
    amount,
    // initialKeyword.id,
    router,
  ]);

  const isButtonDisabled = useMemo(() => {
    const isDataChanged =
      keywordTitle !== initialKeyword?.name ||
      myAccount?.accountNumber !== initialKeyword?.account.accountNumber ||
      otherAccount?.accountNumber !==
        initialKeyword?.subAccount.accountNumber ||
      checkEverytime !== initialKeyword?.checkEveryTime ||
      (!checkEverytime && amount !== initialKeyword?.amount?.toLocaleString());

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
    initialKeyword,
    isValid,
  ]);

  useEffect(() => {
    if (otherAccountRef.current && initialKeyword?.subAccount) {
      otherAccountRef.current.value = initialKeyword?.subAccount.accountNumber;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialKeyword]);

  return (
    <div className='flex flex-col h-full'>
      <Header text='키워드 수정하기' showActionButton={false} />
      <div className='flex flex-col justify-between gap-6 p-[20px] h-full'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col'>
            <strong>키워드명</strong>
            <KeywordInputRef
              className='text-hanaPrimary w-full'
              placeHolder={initialKeyword?.name}
              onChange={handleInputChange}
              defaultValue={initialKeyword?.name}
              ref={keywordNameRef}
            />
          </div>
          <div className='flex flex-col'>
            <strong>보낼 계좌</strong>
            {myAccount && (
              <SelectMyAccount selected={myAccount} onSelect={setMyAccount} />
            )}
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
            {initialKeyword && (
              <>
                {transferToMe ? (
                  <SelectMyAccount
                    selected={
                      otherAccount?.type === 'MyAccount'
                        ? otherAccount
                        : undefined
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
                    <SelectBank
                      onSelect={handleSelectBank}
                      value={otherAccount?.bankId}
                    />
                  </>
                )}
              </>
            )}
          </div>
          <div className='flex flex-col w-full gap-2'>
            <strong>송금 금액</strong>
            <SetAmount
              onChange={handleChange}
              amountRef={amountRef}
              // value={amount}
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
