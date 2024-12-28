import ColorChip from '@/components/atoms/ColorChips';
import { ticketTasks } from '@/data/ticket';
import { IssueTicketResponse } from '@/types/Ticket';
import { IoIosArrowForward } from 'react-icons/io';

export default function MultiKeywordTicket({
  data,
}: {
  data: IssueTicketResponse;
}) {
  return (
    <div className='flex flex-col gap-[11px]'>
      <div className='flex justify-between'>
        <h1 className='text-[24px] font-semibold leading-8'>
          {data.branchName}
        </h1>
        <IoIosArrowForward className='w-[20px] h-[20px] cursor-pointer' />
      </div>

      <div className='flex flex-row justify-between items-center h-[23px]'>
        <ColorChip color='blue'>
          {ticketTasks[parseInt(data.workNumber)].name}
        </ColorChip>
        <p className='text-[13px] text-[#828282]'>
          {new Date().toLocaleTimeString()}
        </p>
      </div>

      <div className='flex flex-row justify-between h-[77px]'>
        <p className='mt-4 text-[#828282]'>대기번호</p>
        <h1 className='text-6xl'>{data.waitingNumber}</h1>
      </div>
    </div>
  );
}
