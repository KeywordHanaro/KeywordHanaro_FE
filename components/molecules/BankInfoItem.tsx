import { TBranch } from '@/types/Branch';
import { BankLogoImg } from '../atoms/BankLogoImg';

type BranchInfoItemProps = {
  data: TBranch;
};

export default function BankInfoItem({
  data: { distance, phone, placeName, addressName },
}: BranchInfoItemProps) {
  return (
    <div className='flex gap-3 p-1 w-full '>
      <div className='relative w-11 h-11'>
        <BankLogoImg bankId={81} />
      </div>
      <div className='flex flex-col gap-1 pt-1'>
        <div className='flex gap-2 items-center'>
          <span className='font-extrabold text-[16px]'>{placeName}</span>
          <span className='font-semibold text-hanaPrimary text-[13px]'>
            {distance}m
          </span>
        </div>
        <div className='flex flex-col font-light text-slate-600 text-[13px]'>
          <div>{addressName}</div>
          <div>
            <span>{phone}</span>
            <span className='text-lg'> | </span>
            <span>09:00 ~ 16:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
