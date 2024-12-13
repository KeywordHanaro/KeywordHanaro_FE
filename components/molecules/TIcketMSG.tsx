import ColorChip from '@/components/atoms/ColorChips';
import { MultiTicket } from '@/data/multiKeyword';
import { IoIosArrowForward } from 'react-icons/io';

export default function MultiKeywordTicket({ data }: { data: MultiTicket }) {
  return (
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
  );
}
