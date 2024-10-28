import Header from '@/components/atoms/Header';
import { KeywordSearchInputToOtherData } from '@/data/transfer';
import Image from 'next/image';
import HowMuch from '../../createKeyword/transfer/HowMuch';

//import { MoneyInputRef } from '@/components/atoms/Inputs';

const headerText = '키워드 송금';
export default function TransferUseKeyword() {
  const handleBack = () => {};
  const inputKeyword = '성엽이 용돈'; //[STT Input]

  const transferData = KeywordSearchInputToOtherData.find(
    (transfer) => transfer.searchKeyword === inputKeyword
  );

  // 송금 데이터가 없을 경우
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

  // 조회된 데이터를 이용해 송금 페이지 렌더링
  return (
    <div className='flex flex-col gap-[24px]'>
      <Header
        text={headerText}
        showBackButton={true}
        onBack={handleBack}
        showActionButton={false}
      />
      <HowMuch />
      {/* {amount ? (
          <p>amount</p>
        ) : (
          <MoneyInputRef
            ref={ref}
            placeHolder='얼마를 요청할까요?'
            type=''
            onChangeValidity={onChangeValidity}
          />
        )} */}
    </div>
  );
}
