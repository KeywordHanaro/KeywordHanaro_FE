import { Button } from '@/components/atoms/Button';
import { PropsWithChildren } from 'react';

export default function KeywordCompletion({
  children,
  onClick,
}: PropsWithChildren & { onClick: () => void }) {
  return (
    <div className='text-center mx-[20px] absolute top-[180px] bottom-0 left-0 right-0 flex flex-col justify-between'>
      <div>
        <h1 className='text-[24px] font-bold mb-[53px]'>
          키워드 설정이 완료되었어요
        </h1>
        <div>{children}</div>
      </div>
      <Button className='w-full mb-[30px]' onClick={onClick}>
        완료
      </Button>
    </div>
  );
}
