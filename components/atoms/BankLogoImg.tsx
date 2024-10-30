import { bankList } from '@/data/bank';
import Image from 'next/image';

type BankLogoImgProps = {
  bankId: number;
};

export function BankLogoImg({ bankId }: BankLogoImgProps) {
  const bank = bankList.find((i) => i.id === bankId);
  return (
    <>
      {bank ? (
        <Image
          src={bank.image}
          alt={bank.bankname}
          className='rounded-full aspect-square object-contain '
          width={40}
          height={40}
          sizes='w-[40px] h-[40px]'
        />
      ) : (
        <span className='w-11 h-11 rounded-full bg-slate-200 '></span>
      )}
    </>
  );
}
