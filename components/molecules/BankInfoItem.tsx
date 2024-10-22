import { bankList } from '@/data/bank';
import clsx from 'clsx';
import Image from 'next/image';

type BankInfoItemProps = {
  branchName: string;
  distance: number;
  address: string;
  contact: string;
  businessHours: string;
};

export default function BankInfoItem({
  branchName,
  distance,
  address,
  contact,
  businessHours,
}: BankInfoItemProps) {
  const logo: string =
    bankList.find((bank) => bank.bankname == 'KEB하나은행')?.image || '';

  return (
    <div className='flex gap-3 p-1 w-full '>
      <div
        className={clsx(
          'relative w-11 h-11 rounded-full',
          !logo && 'bg-gray-300'
        )}
      >
        {logo ? (
          <Image
            src={logo}
            className='rounded-full border '
            layout='fill'
            alt='logo'
          />
        ) : (
          <div className='w-full h-full rounded-full' />
        )}
      </div>
      <div className='flex flex-col gap-1 pt-2'>
        <div className='flex gap-2'>
          <span className='font-extrabold text-[16px]'>{branchName}</span>
          <span className='font-semibold text-hanaPrimary text-[13px] pt-1'>
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
