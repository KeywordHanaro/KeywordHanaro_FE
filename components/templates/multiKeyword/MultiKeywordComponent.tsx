import ColorChip from '@/components/atoms/ColorChips';
import {
  MultiForm,
  MultiKeyword,
  MultiTicket,
  MultiTransfer,
} from '@/data/multiKeyword';
import { IoIosArrowForward } from 'react-icons/io';

export default function MultiKeywordComponent({
  data,
}: {
  data: MultiKeyword;
}) {
  const isMultiTransfer = (data: MultiKeyword): data is MultiTransfer => {
    return data.multiKeyword === 'MultiTransfer';
  };

  const isMultiForm = (data: MultiKeyword): data is MultiForm => {
    return data.multiKeyword === 'MultiForm';
  };

  const isMultiTicket = (data: MultiKeyword): data is MultiTicket => {
    return data.multiKeyword === 'MultiTicket';
  };

  return (
    <div className='flex flex-col justify-between p-[20px] w-full h-full rounded-[16px] bg-[#fff]  shadow-[0px_4px_8px_0px_rgba(136,137,157,0.30)]'>
      {isMultiTransfer(data) && (
        <div className='flex flex-col items-center justify-center gap-[11px]'>
          <p className='m text-[18px] font-normal'>
            {data.accountFrom.accountName}에서
          </p>
          <div className='flex flex-col text-center text-[24px] font-semibold'>
            <div>
              <span className='text-hanaPrimary'>
                {data.accountTo.type === 'MyAccount'
                  ? data.accountTo.accountName
                  : `${data.accountTo.name}님 `}
              </span>
              <span>계좌로</span>
            </div>
            <span className='text-subGray text-[16px]'>
              {data.accountTo.accountNumber}
            </span>
          </div>
          <div className='flex flex-col text-center text-[24px] font-semibold text-hanaPrimary'>
            <p className='text-[25px]'>{data.amount} 원을</p>
            <span className='text-[18px] '> 송금했어요</span>
          </div>
        </div>
      )}

      {isMultiForm(data) && (
        <div className='flex flex-col gap-[11px]'>
          <div className='flex flex-col items-center justify-center gap-[11px] flex-grow break-keep'>
            <p className='text-[18px] font-normal'>
              {data.account.accountName}로
            </p>
            <div className='text-[#069894] text-[24px] font-semibold px-[20px] text-center'>
              {data.members.map((member, idx) =>
                idx !== data.members.length - 1 ? (
                  <span key={member.id} className='mr-[3px]'>
                    {member.name},
                  </span>
                ) : (
                  <span key={member.id}>{member.name}</span>
                )
              )}
              <span className='text-black ml-[3px]'>님에게</span>
              <p className='text-[18px] text-center mt-[11px]'>
                {data.amount} 원이 요청됐어요
              </p>
            </div>
          </div>
        </div>
      )}

      {isMultiTicket(data) && (
        <div className='flex flex-col gap-[11px]'>
          <div className='flex justify-between'>
            <h1 className='text-[24px] font-semibold leading-8'>
              {`${data.bankName}점`}{' '}
            </h1>
            <IoIosArrowForward className='w-[20px] h-[20px] cursor-pointer' />
          </div>

          <div className='flex flex-row justify-between items-center h-[23px]'>
            <ColorChip color='blue'>{data.task}</ColorChip>
            <p className='text-[13px] text-[#828282]'>
              {/* {formatTime(data.date)} */}
              {/* 이 부분 서버에서 받아오자 */}
              2024.10.04 12:56:39
            </p>
          </div>

          <div className='flex flex-row justify-between h-[77px]'>
            <p className='mt-4 text-[#828282]'>대기번호</p>
            <h1 className='text-6xl'>{data.waitNumber}</h1>
          </div>
        </div>
      )}
    </div>
  );
}
