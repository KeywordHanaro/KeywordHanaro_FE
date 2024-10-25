import { Button } from '@/components/atoms/Button';
import { PropsWithChildren } from 'react';

export default function KeywordCompletion({
  children,
  onClick,
}: PropsWithChildren & { onClick: () => void }) {
  return (
    <div className='text-center mt-[120px]'>
      <h1 className='text-[24px] font-bold mb-[53px]'>
        키워드 설정이 완료되었어요
      </h1>
      <div>{children}</div>
      <Button className='w-full mt-[322px]' onClick={onClick}>
        완료
      </Button>
    </div>
  );
}
