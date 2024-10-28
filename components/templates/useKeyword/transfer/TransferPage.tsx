import Header from '@/components/atoms/Header';
import {
  KeywordSearchInputToOtherData,
  UseKeywordTransfer,
} from '@/data/transfer';
import Image from 'next/image';
//import HowMuch from '../../createKeyword/transfer/HowMuch';
import { useState } from 'react';

const headerText = '키워드 송금';
export default function TransferUseKeyword() {
  // 금액 상태를 관리하기 위해 useState 사용
  const [amount, setAmount] = useState<number | ''>('');

  // 금액 입력 핸들러
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value ? Number(e.target.value) : '');
  };

  const handleBack = () => {};
  const inputKeyword = '성엽이 용돈'; //[STT Input]

  const transferData = KeywordSearchInputToOtherData.find(
    (transfer) => transfer.searchKeyword === inputKeyword
  );

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
            해당 키워드로 조회된 정보가 없어요!
          </p>
        </div>
      </div>
    );
  }

  // 조회된 키워드를 이용해 송금 페이지 렌더링
  return (
    <div className='flex flex-col gap-[24px]'>
      <div className='flex justify-start'>
        <Header
          text={headerText}
          showBackButton={true}
          onBack={handleBack}
          showActionButton={false}
        />
        <div className=''>
          {UseKeywordTransfer.map((transfer, data) => (
            <div
              key={data}
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                margin: '10px 0',
              }}
            >
              <p>From Account: {transfer.fromAccount.accountName}</p>
              <p>To Account: {transfer.toAccount.accountNumber}</p>
              <p>Keyword: {transfer.keyword}</p>

              {transfer.type === 'WithoutAmount' ? (
                <div>
                  <label>
                    Enter Amount:
                    <input
                      type='number'
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder='금액을 입력하세요'
                    />
                  </label>
                </div>
              ) : (
                <p>Fixed Amount: {transfer.amount}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
