'use client';

import clsx from 'clsx';
import { IoSearch } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';
import { ChangeEvent, ForwardedRef, forwardRef, useState } from 'react';

type DefaultInputProps = {
  placeHolder?: string;
  name?: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  classNames?: string;
  value?: string;
  required?: boolean;
  error?: string;
};

type SearchInputProps = {
  placeHolder?: string;
  name?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  classNames?: string;
  value?: string;
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

  /** input onchange 핸들러 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    setInputValue(e.target.value);
  };
  /** 입력 초기화 버튼 핸들러 */
  const handleClear = () => {
    setInputValue('');
  };
  /** 사용자 입력 감지 핸들러 */
  const handleBlur = () => {
    setIsTouched(true);
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
            'peer border border-placeholderGray px-4 rounded-xl h-11',
            isTouched && 'invalid:border-errorRed invalid:text-errorRed valid:border-hanaPrimary valid:text-hanaPrimary'
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
              onClick={handleClear}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none cursor-pointer'
            >
              <TiDelete size={20} />
            </a>
          </div>
        )}
        {isTouched && (
          <span className='peer-invalid:block hidden text-errorRed'>
            <small>{error}</small>
          </span>
        )}
      </div>
    </>
  );
}
const DefaultInputRef = forwardRef(DefaultInput);

function SearchInput(
  { name, placeHolder, classNames, onSubmit }: SearchInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const SearchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
    console.log('button click');
  };

  return (
    <>
      <form onSubmit={SearchHandler} className='input-box'>
        <input
          className={clsx(
            'border border-hanaPrimary px-4 rounded-xl h-11 text-hanaPrimary',
            classNames
          )}
          name={name}
          placeholder={placeHolder}
          ref={ref}
        />
        <div className='absolute h-11 w-fit right-0 flex z-100'>
          <button
            type='submit'
            className='absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none cursor-pointer'
          >
            <IoSearch size={20} />
          </button>
        </div>
      </form>
    </>
  );
}
const SearchInpuRef = forwardRef(SearchInput);

export { DefaultInputRef, SearchInpuRef };
