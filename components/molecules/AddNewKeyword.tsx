import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { Card } from '../atoms/Card';

const AddNewKeyword = () => {
  return (
    <Link href='/keyword/create'>
      <Card className='items-center gap-[10px] rounded-[12px] shadow-none border'>
        <div className='flex w-[40px] h-[40px] rounded-full items-center justify-center bg-ToggleBgWhite'>
          <FaPlus className='text-lightGray'></FaPlus>
        </div>
        <span className='text-lightGray text-[15px]'>
          새로운 키워드를 만들어보세요
        </span>
      </Card>
    </Link>
  );
};

export default AddNewKeyword;
