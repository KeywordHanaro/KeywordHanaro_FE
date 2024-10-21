'use client';

import clsx from 'clsx';
import { TiDelete } from 'react-icons/ti';
import { ChangeEvent, ForwardedRef, forwardRef, useState } from 'react';

export type DefaultInputProps = {
  placeHolder?: string;
  name: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  classNames?: string;
  value?: string;
  required?: boolean;
  error: string;
};

function DefaultInput(
  {
    name,
    type,
    onChange,
    classNames,
    value,
    placeHolder,
    required,
    error,
  }: DefaultInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [isTouched, setIsTouched] = useState(false);

  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue(''); // 입력 필드 초기화
  };

  const handleBlur = () => {
    setIsTouched(true); // 입력이 완료되면 상태 업데이트
  };
  return (
    <>
      <div className='input-box'>
        <input
          value={inputValue}
          name={name}
          type={type}
          className={clsx(
            { classNames },
            'peer border border-gray-500 py-2 px-4 rounded-xl h-11',
            isTouched && 'invalid:border-red-600'
          )}
          placeholder={placeHolder}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
          ref={ref}
        />
        {inputValue && (
          <div className='absolute h-11 w-fit right-0 flex'>
            <a
              type='button'
              onClick={handleClear}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none cursor-pointer'
            >
              <TiDelete className='h-5 w-5' />
            </a>
          </div>
        )}

        {isTouched && (
          <span className='peer-invalid:block hidden text-red-600'>
            <small>{error}</small>
          </span>
        )}
      </div>
    </>
  );
}
const DefaultInputRef = forwardRef(DefaultInput);

// function SearchInput() {
//   return (
//     <>
//       <div></div>
//     </>
//   );
// }

export { DefaultInputRef };
