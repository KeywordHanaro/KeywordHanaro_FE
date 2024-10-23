import { bankList, Branch } from '@/data/bank';
import Image from 'next/image';

type BranchInfoItemProps = {
  data: Branch;
};

export default function BankInfoItem({
  data: { branchName, distance, address, contact, businessHours },
}: BranchInfoItemProps) {
  const logo: string =
    bankList.find((bank) => bank.bankname == 'KEB하나은행')?.image || '';

  return (
    <div className='flex gap-3 p-1 w-full '>
      <div>
        {logo ? (
          <Image
            src={logo}
            alt={branchName}
            className='border rounded-full'
            width={40}
            height={40}
            sizes='w-[40px] h-[40px]'
          />
        ) : (
          <div className='w-full h-full rounded-full' />
        )}
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
