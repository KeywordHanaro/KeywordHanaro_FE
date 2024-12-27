'use client';

import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

type LoadingKakaoProps = {
  progress: number; // progress를 숫자로 타입 지정
};

export default function LoadingKakao({ progress }: LoadingKakaoProps) {
  return (
    <div className='w-full px-5 flex justify-center items-center flex-col'>
      <div className='w-full '>
        <Image
          src={'/images/turtle/turtle2.gif'}
          alt=''
          width={100}
          height={100}
          className='flex-1 transition-all'
          style={{ transform: `translateX(${progress * 2.5}%)` }}
          unoptimized
        />
      </div>
      <Progress value={progress} color='#069894' />
    </div>
  );
}
