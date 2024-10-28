import Header from '@/components/atoms/Header';
import { MoneyInputRef } from '@/components/atoms/Inputs';

export default function DepositDocumentPage() {
  return (
    <>
      <div>
        <Header text='입금 서류 미리 작성하기' showActionButton={false} />
        <div className='p-4 flex flex-col'>
          <h1 className='text-[28px] font-semibold'>입금 서류 미리 작성하기</h1>

          <div className='flex flex-col'>
            <strong>입금 계좌</strong>
            <small>내 계좌 선택</small>
          </div>
          <div className='flex flex-col w-full'>
            <strong>입금 금액</strong>
            <MoneyInputRef className='border-b w-full' placeHolder='금액을 입력하세요' />
          </div>
        </div>
      </div>
    </>
  );
}
