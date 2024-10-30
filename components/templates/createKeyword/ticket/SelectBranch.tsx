'use client';

import { SearchInpuRef } from '@/components/atoms/Inputs';
import BankInfoItem from '@/components/molecules/BankInfoItem';
import { Branch } from '@/data/bank';
import { branchData } from '@/data/branch';
import { useRef, useState } from 'react';

export default function SelectBranch({
  // setStep,
  handleSetBranch,
}: {
  // setStep: React.Dispatch<React.SetStateAction<number>>;
  handleSetBranch: (data: Branch) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchResult, setSearchResult] = useState('');

  const handleClick = (data: Branch) => {
    // if (inputRef.current) inputRef.current.value = '';
    handleSetBranch(data);
    setSearchResult('');
  };

  return (
    <div className='w-full flex flex-col gap-[24px]'>
      <div className='flex flex-col'>
        <p>번호표를 발급할</p>
        <p>영업점을 선택해주세요</p>
      </div>

      <SearchInpuRef
        placeHolder='영업점명/주소/지하철명 입력'
        className='w-full'
        onSubmit={() => {
          if (inputRef?.current?.value)
            setSearchResult(inputRef?.current?.value);
        }}
        ref={inputRef}
      />

      <div className='flex flex-col border-t border-[#DFE2E6]'>
        {searchResult !== '' &&
          branchData.map((branch) =>
            branch.branchName.includes(searchResult) ? (
              <div
                key={branch.branchId}
                className='border-b border-[#DFE2E6] pt-[10px] pb-[16px]'
                onClick={() => handleClick(branch)}
              >
                <BankInfoItem data={branch} />
              </div>
            ) : null
          )}
      </div>
    </div>
  );
}
