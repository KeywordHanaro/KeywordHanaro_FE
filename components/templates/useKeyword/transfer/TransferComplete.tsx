import { Button } from '@/components/atoms/Button';
import { MyAccount, OthersAccount } from '@/data/account';
import { useRouter } from 'next/navigation';

export default function TransferComplete({
  fromAccount,
  toAccount,
  amount,
}: {
  amount: string;
  fromAccount: MyAccount;
  toAccount: OthersAccount | MyAccount;
}) {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/');
  };

  return (
    <div className='flex flex-col justify-between p-[20px] w-full h-full '>
      <div className='flex flex-col'>
        <p className='text-[24px] font-semibold text-center py-20'>
          송금이 완료되었어요
        </p>
        <div className='flex flex-col items-center justify-center gap-[11px]'>
          <p className='m text-[18px] font-normal'>
            {fromAccount.accountName}에서
          </p>
          <div className='flex flex-col text-center text-[24px] font-semibold'>
            <div>
              <span className='text-hanaPrimary'>
                {toAccount.type === 'MyAccount'
                  ? toAccount.accountName
                  : `${toAccount.name}님 `}
              </span>
              <span>계좌로</span>
            </div>
            <span className='text-subGray text-[16px]'>
              {toAccount.accountNumber}
            </span>
          </div>
          <div className='flex flex-col text-center text-[24px] font-semibold text-hanaPrimary'>
            <p className='text-[25px]'>{amount} 원을</p>
            <span className='text-[18px] '> 송금했어요</span>
          </div>
        </div>
      </div>

      <Button onClick={handleSubmit} className='w-full'>
        완료
      </Button>
    </div>
  );
}
