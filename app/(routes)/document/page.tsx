'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { useRouter, useSearchParams } from 'next/navigation';


export default function DocumentPage() {
  const searchParams = useSearchParams();
  const task = searchParams?.get('task');
  const bank = searchParams?.get('bank');
  const router = useRouter();
  return (
    <>
      <div className='h-full flex flex-col'>
        <Header text='키워드 번호표 발급' showActionButton={false} />
        <div className='flex-col flex items-center p-4 flex-grow'>
          <div className='flex-grow'>
            <h1 className='text-2xl font-semibold mt-16'>
              신청서 작성이 완료되었어요.
            </h1>
            <h1 className='text-2xl font-semibold text-center mt-8'>
              <strong className='text-hanaPrimary font-semibold'>{bank}</strong>
              에서 <br />
              {task} 절차를 마무리해주세요.
            </h1>
          </div>
          <Button
            className='w-full'
            onClick={() =>
              router.push(`/ticket/detail?document=false&task=예금`)
            }
          >
            완료
          </Button>
        </div>
      </div>
    </>
  );
}
