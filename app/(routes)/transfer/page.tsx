'use client';

import Header from '@/components/atoms/Header';
import { MoneyInputRef } from '@/components/atoms/Inputs';
import { HowMuchProps } from '@/components/templates/createKeyword/transfer/HowMuch';
import { KeywordInputToOtherData, UseKeywordTransfer } from '@/data/transfer';
import Image from 'next/image';
import { useRef } from 'react';

export default function TransferPage({ fromAccount, toAccount }: HowMuchProps) {
  const headerText = '키워드 송금';
  const inputKeyword = '서아 저금통'; //[STT Input]
  const { balance } = KeywordInputToOtherData;

  const transferData = UseKeywordTransfer.find(
    (transfer) => transfer.keyword === inputKeyword
  );

  const amountRef = useRef<HTMLInputElement>(null);

  const handleBack = () => {};
  const onChangeValidity = (isValid: boolean) => {
    // 입력값 유효성 처리 함수
    console.log('Input validity:', isValid);
  };
  // 검색한 키워드가 없을 경우
  if (!transferData) {
    return (
      <div>
        <Header
          text={headerText}
          showBackButton={true}
          onBack={handleBack}
          showActionButton={false}
        />
        <div className='flex-col flex justify-center'>
          <Image
            src={'/images/alarts/noData.gif'}
            alt=''
            width={300}
            height={300}
            className='mx-auto'
          />
          <p className='text-center font-bold text-[20px]'>
            해당 키워드로 조회된 내역이 없어요!
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className='w-full h-full relative'>
      <Header
        text={headerText}
        showBackButton={true}
        onBack={handleBack}
        showActionButton={false}
      />
      <div className='w-full flex flex-col px-[20px]'>
        <div className='text-[24px] font-semibold'>
          내 {fromAccount.accountName} 계좌에서
        </div>
        <div className='text-[12px] font-semibold'>
          잔액 {balance.toLocaleString()}원
        </div>
      </div>
      <div>
        <div className='text-[24px] font-semibold'>
          {toAccount.type === 'MyAccount'
            ? toAccount.accountName + ' '
            : toAccount.name + '님 '}
          계좌로
        </div>
        <div className='text-[12px] font-semibold'>
          {toAccount.accountNumber}
        </div>
      </div>
      {transferData.type === 'WithoutAmount' ? ( //amount가 존재하는 데이터는 amount를 가져온다
        <MoneyInputRef
          ref={amountRef}
          placeHolder='얼마를 요청할까요?'
          type=''
          onChangeValidity={onChangeValidity}
        />
      ) : (
        //withoutAmount는 input활성화
        <div className='text-subGray font-semibold h-[32px] text-[18px] flex items-center'>
          <div>금액은 키워드 호출 시 결정돼요</div>
        </div>
      )}
    </div>
  );
}
