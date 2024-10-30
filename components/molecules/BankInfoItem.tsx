import { Branch } from '@/data/bank';
import { BankLogoImg } from '../atoms/BankLogoImg';

type BranchInfoItemProps = {
  data: Branch;
};

export default function BankInfoItem({
  data: { branchName, distance, address, contact, businessHours },
}: BranchInfoItemProps) {
  return (
    <div className='flex gap-3 p-1 w-full '>
      <div className='relative w-11 h-11'>
        <BankLogoImg bankId={81} />
      </div>
      <div className='flex flex-col gap-1 pt-1'>
        <div className='flex gap-2 items-center'>
          <span className='font-extrabold text-[16px]'>{branchName}</span>
          <span className='font-semibold text-hanaPrimary text-[13px]'>
            {distance}m
          </span>
        </div>
        <div className='flex flex-col font-light text-slate-600 text-[13px]'>
          <div>{address}</div>
          <div>
            <span>{contact}</span>
            <span className='text-lg'> | </span>
            <span>{businessHours}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
