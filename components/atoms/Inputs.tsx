'use client';

import { FaArrowCircleUp } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';
import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useId } from 'react';
import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type baseInputTypeProps = {
  placeHolder?: string;
  className?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

/** ------------------------------------------ */
type DefaultInputProps = baseInputTypeProps & {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  error?: string;
};

function DefaultInput(
  {
    name,
    type,
    onChange,
    className,
    // value,
    placeHolder,
    required,
    error,
    ...props
  }: DefaultInputProps,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const [isTouched, setIsTouched] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLInputElement);

  /** 입력 초기화 버튼 핸들러 */
  const handleClear = () => {
    if (ref.current) {
      ref.current.value = '';
    }
    // 부모 컴포넌트에 변경 사항 알리기
    if (onChange) {
      const event = {
        target: { value: '', name: name },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  /** 사용자 입력 감지 핸들러 */
  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <>
      <div className='input-box'>
        <input
          // value={inputValue}
          name={name}
          type={type}
          className={cn(
            { className },
            'peer border border-placeholderGray px-4 rounded-xl h-11 focus:border-hanaPrimary focus:text-hanaPrimary',
            isTouched && 'invalid:border-errorRed invalid:text-errorRed '
          )}
          placeholder={placeHolder}
          onChange={onChange}
          onBlur={handleBlur}
          required={required}
          ref={ref}
          {...props}
        />
        {ref?.current?.value && (
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

/** ------------------------------------------ */
type SearchInputProps = baseInputTypeProps & {
  name?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value?: string;
};

/**onSubmit에 따라 검색을 진행합니다. */
function SearchInput(
  { name, placeHolder, className, onSubmit, ...props }: SearchInputProps,
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
          className={cn(
            'border border-hanaPrimary px-4 rounded-xl h-11 text-hanaPrimary',

            className
          )}
          name={name}
          placeholder={placeHolder}
          ref={ref}
          {...props}
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

/** ------------------------------------------ */
type AccountInputProps = baseInputTypeProps;
// export type AccountRefProps = {
//   bankId: number;
//   inputRef: React.RefObject<HTMLInputElement>;
// };

/**Ref로 bankId와 계좌번호를 가져옵니다. */
function AccountInput(
  { className, placeHolder, ...props }: AccountInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className='flex flex-col text-[18px] after:w-full border-b'>
      <input
        className={cn(
          'py-2 font-semibold text-[18px]  text-hanaPrimary border-b placeholder:text-placeholderGray',
          className
        )}
        placeholder={placeHolder}
        ref={ref}
        {...props}
      />
    </div>
  );
}
const AccountInputRef = forwardRef(AccountInput);

/** ------------------------------------------ */
type MoneyInputProps = baseInputTypeProps & {
  onChangeValidity?: (valid: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
/** 금액 입력, ref로 입력 값 가져오기 */
function MoneyInput(
  {
    className,
    placeHolder,
    onChangeValidity,
    onChange = () => {},
    ...props
  }: MoneyInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [value, setValue] = useState<string>('');
  const spanRef = useRef<HTMLSpanElement>(null);

  const formatNumberWithCommas = useCallback((inputValue: string): string => {
    if (!inputValue) return '';
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const parsedValue = numericValue ? parseInt(numericValue, 10) : 0;
    return new Intl.NumberFormat('ko-KR').format(parsedValue);
  }, []);

  useEffect(() => {
    if (spanRef.current && ref && typeof ref !== 'function') {
      const textWidth = spanRef.current.offsetWidth;
      // console.log("🚀 ~ useEffect ~ textWidth:", !!textWidth)
      if (!textWidth && ref.current) {
        ref.current.style.width = '100%';
      } else if (ref.current?.value) {
        ref.current.style.width = `${textWidth + 1}px`;
      }
    }
  }, [value, ref]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const inputValue = e.target.value;
      const number = parseInt(inputValue.replace(/[^0-9]/g, ''), 10);
      const valid = !isNaN(number) && number > 0;
      onChangeValidity?.(valid);
      const formattedValue = formatNumberWithCommas(inputValue);
      setValue(formattedValue);
      onChange(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, formatNumberWithCommas, onChangeValidity]
  );

  return (
    <div className='flex flex-row items-center jusc text-hanaPrimary'>
      <input
        ref={ref}
        value={value}
        onChange={handleChange}
        className={cn(
          'max-w-full text-2xl font-semibold placeholder:text-placeholderGray transition-all duration-500 ',
          className
        )}
        placeholder={placeHolder}
        required
        {...props}
      />
      <span
        ref={spanRef}
        className={cn(
          'invisible absolute whitespace-pre max-w-full text-2xl font-semibold',
          className
        )}
        aria-hidden='true'
      >
        {value}
      </span>
      {value && (
        <span className={cn('z-50 text-2xl font-semibold', className)}>원</span>
      )}
    </div>
  );
}
const MoneyInputRef = forwardRef(MoneyInput);

/** ------------------------------------------ */
type KeywordInputProps = baseInputTypeProps;
function KeywordInput(
  { className, placeHolder, ...props }: KeywordInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className='after:w-full after:border  flex flex-col gap-2 w-full'>
      <input
        ref={ref}
        className={cn(
          'w-full text-center text-2xl font-semibold placeholder:text-placeholderGray',
          className
        )}
        placeholder={placeHolder}
        {...props}
      />
    </div>
  );
}
const KeywordInputRef = forwardRef(KeywordInput);

/** ------------------------------------------ */
type AIInputProps = baseInputTypeProps & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  formClassName: string;
};
function AIInput(
  {
    className,
    formClassName,
    placeHolder,
    onSubmit,
    isLoading,
    ...props
  }: AIInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
    if (formRef.current) {
      formRef.current.reset();
    }
    console.log('hi2');
  };

  return (
    <>
      <form
        className={cn(
          'relative flex items-center gradient-border overflow-hidden',
          formClassName
        )}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <input
          className={cn(
            'w-[calc(100%-30px)] px-4 py-3 text-[14px] placeholder-placeholderGray',
            'peer ',
            className
          )}
          placeholder={placeHolder}
          ref={ref}
          required
          {...props}
        />
        <button
          className={cn(
            'absolute right-4 flex-shrink-0 transition-all duration-300',
            'peer-focus:scale-125 peer-focus:stroke-none'
          )}
          type='submit'
          disabled={isLoading}
        >
          <svg viewBox='0 0 20 20' width='20' height='20'>
            <defs>
              <linearGradient id='grad1' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop
                  offset='0%'
                  style={{ stopColor: '#068298', stopOpacity: 1 }}
                />
                <stop
                  offset='100%'
                  style={{ stopColor: '#e523e2', stopOpacity: 0.96 }}
                />
              </linearGradient>
            </defs>
            <FaArrowCircleUp fill='url(#grad1)' size={20} />
          </svg>
        </button>
      </form>
    </>
  );
}
const AIInputRef = forwardRef(AIInput);

export type AuthInputProps = {
  name: string;
  label: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  classNames?: string;
  inputAttrs?: InputHTMLAttributes<HTMLInputElement>;
  children?: React.ReactNode;
  value?: string;
};

const AuthInput = (
  {
    value,
    name,
    label,
    type,
    onChange,
    classNames,
    inputAttrs,
    children,
  }: AuthInputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const id = useId();
  return (
    <>
      <div className='input-box'>
        <span className='input-icon'>{children}</span>
        <input
          value={value}
          name={name}
          id={id}
          type={type}
          className={`peer ${classNames}`}
          onChange={onChange}
          ref={ref}
          {...inputAttrs}
          required
        />
        <label
          // className='peer-valid:top-[-5px] peer-focus:top-[-5px]'
          className={cn(
            'peer-valid:top-[-5px] peer-focus:top-[-5px]',
            value &&  'top-[-5px]'
          )}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    </>
  );
};

const AuthInputRef = forwardRef(AuthInput);

export {
  DefaultInputRef,
  SearchInpuRef,
  AccountInputRef,
  MoneyInputRef,
  KeywordInputRef,
  AIInputRef,
  AuthInputRef,
};
