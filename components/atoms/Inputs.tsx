'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { bankList } from '@/data/bank';
import { FaAngleDown } from 'react-icons/fa';
import { FaArrowCircleUp } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';
import Image from 'next/image';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

type baseInputTypeProps = {
  placeHolder? : string;
  classNames?: string;
  type?:string;
}

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
          className={cn(
            { classNames },
            'peer border border-placeholderGray px-4 rounded-xl h-11',
            isTouched &&
              'invalid:border-errorRed invalid:text-errorRed valid:border-hanaPrimary valid:text-hanaPrimary'
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

/** ------------------------------------------ */
type SearchInputProps = baseInputTypeProps &{
  name?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value?: string;
};

/**onSubmit에 따라 검색을 진행합니다. */
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
          className={cn(
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

/** ------------------------------------------ */
type AccountInputProps = baseInputTypeProps;
export type AccountRefProps = {
  bankId: number;
  inputRef: React.RefObject<HTMLInputElement>;
};

/**Ref로 bankId와 계좌번호를 가져옵니다. */
function AccountInput(
  { classNames, placeHolder }: AccountInputProps,
  ref: ForwardedRef<AccountRefProps>
) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [bankId, setBankId] = useState<number>(0);

  const handleScroll = () => {
    setHasScrolled(true);
  };
  const handleBankClick = (id: number) => {
    setBankId(id);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    bankId,
    inputRef,
  }));

  return (
    <>
      <div className='flex flex-col p-2 text-[18px]'>
        <input
          className={cn(
            ' px-6 py-2 text-hanaPrimary border-b-placeholderGray border-b-2 ',
            classNames
          )}
          placeholder={placeHolder}
          ref={inputRef}
        />
        <Drawer>
          <DrawerTrigger className='my-2 rounded-lg after:border-b-placeholderGray after:w-full after:border flex flex-col'>
            <div className='flex flex-row justify-between w-full h-full px-4 items-center'>
              <p
                className={cn(
                  ' text-left py-2',
                  bankId ? 'text-fontBlack' : 'text-placeholderGray'
                )}
              >
                {bankList.find((bank) => bank.id === bankId)?.bankname ??
                  '은행선택'}
              </p>
              <FaAngleDown />
            </div>
          </DrawerTrigger>
          <DrawerContent className='min-h-[300px] max-h-[calc(100vh-200px)] overflow-hidden transition-all duration-500 ease-out'>
            <DrawerHeader className='text-left'>
              <DrawerTitle>은행을 선택해주세요</DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <DrawerFooter
              onScroll={handleScroll}
              className={cn(
                ' overflow-y-scroll transition-all duration-500 ease-out',
                hasScrolled ? 'h-screen' : 'h-[300px]'
              )}
            >
              <div className='grid grid-cols-3 gap-3'>
                {bankList.map((bank) => (
                  <DrawerClose
                    key={bank.id}
                    onClick={() => handleBankClick(bank.id)}
                    className='col-span-1 aspect-square flex justify-center rounded-lg flex-col border-iconGray border-2 items-center'
                  >
                    <span className='aspect-square relative w-2/3'>
                      <Image
                        src={bank.image}
                        className='object-contain aspect-square p-2'
                        alt='test'
                        fill
                        sizes='min-width:40px height:40px'
                      />
                    </span>
                    <small>{bank.bankname}</small>
                  </DrawerClose>
                ))}
              </div>
              <DrawerClose className='bg-disableGray p-3 flex justify-center items-center rounded-lg'>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
const AccountInputRef = forwardRef(AccountInput);

/** ------------------------------------------ */
type MoneyInputProps = baseInputTypeProps
/** 금액 입력, ref로 입력 값 가져오기 */
function MoneyInput(
  { classNames, placeHolder }: MoneyInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [value, setValue] = useState<string>('');

  const formatNumberWithCommas = (inputValue: string): string => {
    if (!inputValue) return '';
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    return new Intl.NumberFormat('ko-KR').format(parseInt(numericValue, 10));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = e.target.value;
    const formattedValue = formatNumberWithCommas(inputValue);
    setValue(formattedValue);
  };

  return (
    <div className='p-2 flex flex-row items-center text-hanaPrimary'>
      <input
        ref={ref}
        value={value}
        onChange={handleChange}
        className={cn(
          classNames,
          'max-w-full min-w-[100px] w-auto px-4 py-2 text-2xl font-extrabold '
        )}
        placeholder={placeHolder}
        required
      />
      {value && <span className='ml-2 z-50 text-2xl font-extrabold'>원</span>}
    </div>
  );
}
const MoneyInputRef = forwardRef(MoneyInput);

/** ------------------------------------------ */
type KeywordInputProps = {
  classNames?: string;
  placeHolder?: string;
};
function KeywordInput(
  { classNames, placeHolder }: KeywordInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className='after:w-full after:border after:border-b-placeholderGray flex flex-col p-2'>
      <input
        ref={ref}
        className={cn('w-full p-2 text-center text-2xl font-bold', classNames)}
        placeholder={placeHolder}
      />
    </div>
  );
}
const KeywordInputRef = forwardRef(KeywordInput);

/** ------------------------------------------ */
type AIInputProps = baseInputTypeProps & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading : boolean;
};
function AIInput(
  { classNames, placeHolder, onSubmit,isLoading }: AIInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
    if (formRef.current) {
      formRef.current.reset();
    }
    console.log('hi2')
  };

  return (
    <>
      <form
        className={cn('relative flex items-center gradient-border overflow-hidden',classNames)}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <input
          className={cn(
            'w-[calc(100%-30px)] px-4 py-3 text-[14px] placeholder-placeholderGray',
            'peer ',
          )}
          placeholder={placeHolder}
          ref={ref}
          required
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

export {
  DefaultInputRef,
  SearchInpuRef,
  AccountInputRef,
  MoneyInputRef,
  KeywordInputRef,
  AIInputRef,
};
