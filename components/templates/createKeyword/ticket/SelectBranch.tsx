'use client';

import SpeechToText from '@/components/SpeechToText';
import { SearchInpuRef } from '@/components/atoms/Inputs';
import BankInfoItem from '@/components/molecules/BankInfoItem';
import { Skeleton } from '@/components/ui/skeleton';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { useBranchApi } from '@/hooks/useBranch/useBranch';
import { TBranch } from '@/types/Branch';
import { useEffect, useRef, useState } from 'react';

export default function SelectBranch({
  handleSetBranch,
}: {
  handleSetBranch: (data: TBranch) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [branches, setBranches] = useState<TBranch[]>([]);
  // const [searchQuery, setSearchQuery] = useState('');
  const { result, setResult } = useVoiceInputSession();
  // console.log(searchQuery);
  const { getBranchList } = useBranchApi();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getBranchList(position.coords.longitude, position.coords.latitude).then(
          (response) => {
            setBranches(response);
          }
        );
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSearch = () => {
    if (inputRef?.current?.value) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getBranchList(
            position.coords.longitude,
            position.coords.latitude,
            inputRef?.current?.value
          ).then((response) => {
            setBranches(response);
          });
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    }
  };

  const handleClick = (branch: TBranch) => {
    handleSetBranch(branch);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (result) {
      if (inputRef.current) {
        inputRef.current.value = result;
      }
      setResult('');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getBranchList(
            position.coords.longitude,
            position.coords.latitude,
            result
          );
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className='w-full flex flex-col gap-[24px]'>
      <div className='flex flex-col'>
        <p>번호표를 발급할</p>
        <p>영업점을 선택해주세요</p>
      </div>

      <SearchInpuRef
        placeHolder='영업점명/주소/지하철명 입력'
        className='w-full'
        onSubmit={handleSearch}
        ref={inputRef}
      />

      <div className='flex flex-col pt-3 border-t border-[#DFE2E6] w-full'>
        {branches.length ? (
          <>
            {branches.map((branch) => (
              <div
                key={branch.id}
                className='border-b border-[#DFE2E6] pt-[10px] pb-[16px]'
                onClick={() => handleClick(branch)}
              >
                <BankInfoItem data={branch} />
              </div>
            ))}
          </>
        ) : (
          <div className='flex flex-wrap justify-around gap-3 items-start '>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className='flex flex-col gap-3 w-full'>
                <Skeleton className='h-[100px] w-full rounded-xl  ' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-[250px]' />
                  <Skeleton className='h-4 w-[200px]' />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <SpeechToText autoStart placeholder='영업점을 선택해주세요' />
    </div>
  );
}
