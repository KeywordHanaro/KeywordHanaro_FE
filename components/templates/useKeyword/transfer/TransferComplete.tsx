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
    <div className='flex flex-col gap-[30px] pt-[69px] '>
      <p className='text-[24px] font-semibold text-center mb-[60px]'>
        송금이 완료되었어요
      </p>

      <div className='flex flex-col items-center justify-center gap-[11px] flex-grow '>
        <p className='text-[18px] font-normal'>{fromAccount.accountName}에서</p>
        <div className='text-[#069894] text-[24px] font-semibold flex-grow  px-[20px]'>
          {toAccount.type === 'MyAccount'
            ? toAccount.accountName
            : toAccount.name}
          <span className='text-black ml-[3px]'>
            {toAccount.type === 'MyAccount'
              ? toAccount.accountName
              : `${toAccount.name}님`}
            계좌로
          </span>
          <span className='text-subGray'>{toAccount.accountNumber}</span>
          <p className='text-[18px] text-center mt-[11px]'>
            {amount} 원을 송금했어요
          </p>
        </div>
      </div>

      <Button
        className='absolute bottom-[34px]'
        style={{ width: 'calc(100% - 40px)' }}
        onClick={handleSubmit}
      >
        완료
      </Button>
    </div>
  );
}
