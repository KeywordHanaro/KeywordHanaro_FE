'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean; // 클릭 불가능 상태를 위한 prop
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  children,
  isDisabled = false,
  className = '',
  size = 'md',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'p-2 rounded-xl',
        isDisabled
          ? 'bg-ToggleBgWhite text-black cursor-not-allowed' // unclickable
          : 'bg-hanaPrimary text-white', // clickable
        size === 'sm' && 'btn-sm',
        size === 'md' && 'btn-md',
        size === 'lg' && 'btn-lg',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const EditButton = (props: ButtonProps) => {
  return (
    <button
      className={clsx('px-[7px] py-[5px] rounded-[8px]', 'btn-edit')}
      {...props}
    >
      수정
    </button>
  );
};

export const DelButton = (props: ButtonProps) => {
  return (
    <button
      className={clsx('px-[7px] py-[5px] rounded-[8px]', 'btn-del')}
      {...props}
    >
      삭제
    </button>
  );
};
