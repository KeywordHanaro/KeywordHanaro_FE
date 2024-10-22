'use client';

import clsx from 'clsx';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import ColorChip from '../atoms/ColorChips';
import { Toggle } from '../ui/toggle';

export default function Receipt() {
  const now = new Date();
  const number = 117;
  const people = 11;

  const [more, setMore] = useState<boolean>(true);
  const [position, setPosition] = useState<boolean>(false);
  const [print, setPrint] = useState<boolean>(false);

  const handleMore = () => {
    setMore(!more);
  };
  const handlePrint = () => {
    setPrint(true);
  };
  const handlePosition = () => {
    setPosition(true);
  };

  useEffect(() => {
    setTimeout(() => {
      handlePrint();
    }, 1000);
    setTimeout(() => {
      handlePosition();
    }, 2000);
  }, []);

  return (
    <div
      className={clsx(
        'relative',
        'before:w-full before:border-t-8 before:border-t-gray-700 before:z-50 before:absolute before:rounded-r-lg'
      )}
    >
      <div
        className={clsx(
          more ? (print ? 'h-[310px]' : 'h-0') : 'h-[190px]',
          'transition-all duration-1000 ease-in-out relative transform-top overflow-hidden'
        )}
      >
        <div
          className={clsx(
            'border border-b-0 border-placeholderGray p-5 pb-1 flex flex-col gap-2.5 z-0 bg-white',
            'zigzag-border-cover',
            'absolute w-[calc(100%-10px)] left-1',
            position ? 'top-0' : 'bottom-3'
          )}
        >
          <div className='flex flex-row justify-between items-center h-[23px]'>
            <ColorChip color='blue'>예금</ColorChip>
            <p className='text-[13px]'>
              {now.toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </p>
          </div>
          <div className='flex flex-row justify-between h-[77px] pb-2.5'>
            <small className='mt-4'>대기번호</small>
            <h1 className='text-6xl'>{number}</h1>
          </div>
          <div>
            <div
              className={clsx(
                'flex flex-col gap-2.5 transition-all duration-1000 ease-in-out overflow-hidden',
                more ? 'h-[120px]' : 'h-0'
              )}
            >
              <hr />
              <span className='flex flex-col gap-2'>
                <div className='flex flex-row justify-between text-[15px]'>
                  <p>대기손님</p>
                  <p>{`${people}명`}</p>
                </div>
                <small className='text-[12px]'>
                  영업점 상황에 따라 대기시간이 달라질 수 있어요.
                </small>
              </span>
              <span className='flex flex-col gap-2'>
                <div className='flex flex-row justify-between text-[15px]'>
                  <p>대기알림</p>
                  <Toggle />
                </div>
                <small className='text-[12px]'>
                  대기 손님이 3명일 때, 앱 알림으로 알려드려요.
                </small>
              </span>
            </div>
            <button
              className='flex justify-center w-full focus:outline-none'
              onClick={handleMore}
            >
              {more ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
            </button>
          </div>
          <span className='zigzag-border' />
        </div>
      </div>
    </div>
  );
}
