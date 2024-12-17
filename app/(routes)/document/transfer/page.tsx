'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { AccountInputRef, MoneyInputRef } from '@/components/atoms/Inputs';
import SelectBank from '@/components/molecules/SelectBank';
import SelectMyAccount from '@/components/molecules/SelectMyAccount';
import { MyAccount, OthersAccount } from '@/data/account';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';

export default function TransferDocumentPage() {
  const [myAccount, setMyAccount] = useState<MyAccount | undefined>(undefined);

  const [otherAccount, setOtherAccount] = useState<
    MyAccount | OthersAccount | undefined
  >(undefined);
  const otherAccountRef = useRef<HTMLInputElement>(null);

  const [isValid, setIsValid] = useState<boolean>(false);
  const ammountRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  console.log('myAccount', myAccount);
  console.log('otherAccount', otherAccount);
  console.log('isValid', isValid);

  const handleAccountSelect = (account: MyAccount) => {
    setMyAccount(account);
  };

  const handleAccountInput = useCallback(() => {
    if (otherAccountRef.current) {
      setOtherAccount((prev) =>
        prev?.type === 'OthersAccount'
          ? { ...prev, accountNumber: otherAccountRef.current!.value }
          : {
              type: 'OthersAccount',
              name: '',
              bankId: 0,
              accountNumber: otherAccountRef.current!.value,
            }
      );
    }
  }, []);

  const handleSelectBank = useCallback((id: number) => {
    setOtherAccount((prev) =>
      prev?.type === 'OthersAccount'
        ? { ...prev, bankId: id }
        : { type: 'OthersAccount', name: '', bankId: id, accountNumber: '' }
    );
  }, []);

  const isAccountValid =
    myAccount?.type === 'MyAccount' &&
    'bankId' in myAccount &&
    'accountNumber' in myAccount &&
    otherAccount?.type === 'OthersAccount' &&
    otherAccount.bankId !== 0 &&
    otherAccount.accountNumber !== '';
  return (
    <>
      <div>
        <Header text='송금 서류 미리 작성하기' showActionButton={false} />
        <div className='p-4 flex flex-col gap-6'>
          <h1 className='text-[24px] font-semibold'>송금 서류 미리 작성하기</h1>

          <div className='flex flex-col'>
            <strong>보낼 계좌</strong>
            <SelectMyAccount onSelect={handleAccountSelect} />
          </div>
          <div>
            <strong>받는 계좌</strong>
            <AccountInputRef
              onChange={handleAccountInput}
              placeHolder='계좌번호 입력'
              ref={otherAccountRef}
            />
            <SelectBank onSelect={handleSelectBank} />
          </div>
          <div className='flex flex-col w-full'>
            <strong>입금 금액</strong>
            <span className='border-b'>
              <MoneyInputRef
                placeHolder='금액을 입력하세요'
                onChangeValidity={setIsValid}
                ref={ammountRef}
              />
            </span>
          </div>
          <Button
            onClick={
              () => router.push('/document?task=송금&bank=하나은행 성수점')
              // console.log(isValid, myAccount, otherAccount, bankId)
            }
            className='w-full'
            isDisabled={!(isValid && myAccount && isAccountValid)}
          >
            완료
          </Button>
        </div>
      </div>
    </>
  );
}
