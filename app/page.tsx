import { MicRef } from '@/components/atoms/Mic';
import { Toggle } from '@/components/ui/toggle';
import { BsPerson } from 'react-icons/bs';

export default function Home() {
  return (
    <div className='h-screen px-[20px] relative '>
      <div className='w-full h-[60px] flex px-[10px] items-center justify-between'>
        <a href='#'>
          <BsPerson className='w-[40px] h-[40px] cursor-pointer' />
        </a>
        <div>
          <Toggle className='mr-[15px]' />
          <a href='#' className='mr-[15px]'>
            지갑
          </a>
          <a href='#'>알림</a>
        </div>
      </div>
      <MicRef />
    </div>
  );
}
