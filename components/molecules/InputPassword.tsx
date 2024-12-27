'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { FiDelete } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

type InputPasswordProps = {
  // open : boolean
  onSubmit: () => void;
  validatePassword: (password: number[]) => Promise<boolean>;
};

export default function InputPassword({
  onSubmit,
  validatePassword,
  ...props
}: React.ComponentProps<typeof Drawer> & InputPasswordProps) {
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  const [shuffledNumbers, setShuffleNumbers] = useState<number[]>(
    shuffleArray(numbers)
  );
  const [password, setPassword] = useState<number[]>([]);
  const pathName = usePathname();

  const closeRef = useRef<HTMLButtonElement>(null);
  const handleOpen = () => {
    setShuffleNumbers(shuffleArray(numbers));
  };

  const fetching = async () => {
    setPassword([]);

    const isValid = await validatePassword(password);
    if (isValid) {
      closeRef.current?.click();
      onSubmit();
    } else {
      alert('비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
      setPassword([]);
    }
  };

  const handleClick = (num: number) => {
    setPassword([...password, num]);
  };

  useEffect(() => {
    if (password.length === 4) {
      // console.log(password);
      fetching();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <>
      <Drawer onOpenChange={handleOpen} {...props}>
        <DrawerContent
          bar={false}
          className='h-[410px] bg-hanaPrimary border-none'
        >
          <DrawerHeader className='text-white flex flex-col justify-center items-center  font-semibold'>
            <DrawerTitle className='text-[18px]'>
              {pathName.includes('multiKeyword')
                ? '간편 비밀번호'
                : '계좌 비밀번호'}
            </DrawerTitle>
            <DrawerDescription className='text-[25px] grid grid-cols-4 w-[100px] text-white'>
              {[...Array(4)].map((_, i) => (
                <span key={i}>{i < password.length ? '*' : 'O'}</span>
              ))}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className='h-full p-0 relative'>
            <div className='bg-white h-full grid-cols-3 grid'>
              {shuffledNumbers.map((item, index) => (
                <button
                  key={index}
                  className={cn(
                    'flex justify-center items-center text-4xl',
                    index === 9 && 'col-span-3'
                  )}
                  onClick={() => handleClick(item)}
                >
                  {item}
                </button>
              ))}
              <button className='bg-disableGray absolute left-0 bottom-0 w-1/3 h-[77px] justify-center items-center flex'>
                <FiDelete size={35} />
              </button>
              <DrawerClose
                ref={closeRef}
                className='text-white bg-black text-xl font-bold absolute right-0 bottom-0 w-1/3 h-[77px]'
              >
                취소
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

/** example */
/*
'use client';

import InputPassword from '@/components/molecules/InputPassword';
import { useState } from 'react';

export default function CompsTestPage() {
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = () =>{
    alert("is going to fetching and what do you want to do")
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Password</button>
      <div className='border mt-3'>
        <InputPassword onSubmit={handleSubmit} open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
}
*/
