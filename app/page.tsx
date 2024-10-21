'use client';

import { Button, DelButton, EditButton } from '@/components/atoms/button';

//import Image from "next/image";

export default function Home() {
  return (
    <div className=''>
      <div className='p-4'>
        <h1 className='text-3xl font-extrabold'>clickAble</h1>
        <Button size='sm' onClick={() => alert('작은 버튼 클릭!')}>
          sm
        </Button>
        <Button size='md' isDisabled={false}>
          md
        </Button>
        <Button size='lg' isDisabled={false}>
          lg
        </Button>
      </div>
      <div className='p-4'>
        <h1 className='text-3xl font-extrabold'>unclickable</h1>
        <Button
          size='sm'
          isDisabled={true}
          onClick={() => alert('작은 버튼 클릭!')}
        >
          sm
        </Button>
        <Button size='md' isDisabled={true}>
          md
        </Button>
        <Button size='lg' isDisabled={true}>
          lg
        </Button>
      </div>
      <EditButton onClick={() => alert('Edit 버튼 클릭!')}>수정</EditButton>
      <DelButton onClick={() => alert('삭제 버튼 알림')}>삭제</DelButton>
    </div>
  );
}
