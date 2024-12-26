'use client';

import { Progress } from '@/components/ui/progress';

type LoadingKakaoProps = {
  progress: number; // progress를 숫자로 타입 지정
};

export default function LoadingKakao({ progress }: LoadingKakaoProps) {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <Progress value={progress} color='#069894' />
    </div>
  );
}
