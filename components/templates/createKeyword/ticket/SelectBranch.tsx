'use client';

import SpeechToText from '@/components/SpeechToText';
import { SearchInpuRef } from '@/components/atoms/Inputs';
import BankInfoItem from '@/components/molecules/BankInfoItem';
import { Skeleton } from '@/components/ui/skeleton';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { useBranchApi } from '@/hooks/useBranch/useBranch';
import { TBranch } from '@/types/Bank';
import { useEffect, useRef, useState } from 'react';
import { levenshtein } from '@/lib/utils';

export default function SelectBranch({
  handleSetBranch,
  autoStart,
}: {
  handleSetBranch: (data: TBranch) => void;
  autoStart?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [branches, setBranches] = useState<TBranch[]>([]);
  // const [searchQuery, setSearchQuery] = useState('');
  const { result, setResult } = useVoiceInputSession();
  const [isLoading, setIsLoading] = useState(true);

  // console.log(searchQuery);
  const { getBranchList } = useBranchApi();

  const fetchData = async (value?: string) => {
    setIsLoading(true);
    if (inputRef.current && value) {
      inputRef.current.value = value;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getBranchList(
          position.coords.longitude,
          position.coords.latitude,
          value
        ).then((response) => {
          setBranches(response);
          setIsLoading(false);
        });
      },
      (error) => {
        console.error('Error getting current position:', error);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      fetchData();
    } else {
      console.error('Geolocation is not supported by this browser.');
      setIsLoading(false);
    }
  }, []);

  const handleSearch = () => {
    if (inputRef?.current?.value) {
      fetchData(inputRef?.current?.value);
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
      const findSimilarBranches = (input: string, threshold: number = 0.3) => {
        const inputWords = input.toLowerCase().split(' ');
        let similarBranch = null;
        let maxSimilarity = 0;

        branches.forEach((branch) => {
          const branchWords = branch.placeName.toLowerCase().split(' ');
          const branchLength = branchWords.length;

          for (let i = 0; i <= inputWords.length - branchLength; i++) {
            const inputSubset = inputWords.slice(i, i + branchLength).join(' ');
            const distance = levenshtein(
              inputSubset,
              branch.placeName.toLowerCase()
            );
            const similarity =
              1 -
              distance / Math.max(inputSubset.length, branch.placeName.length);

            if (similarity >= threshold && similarity > maxSimilarity) {
              maxSimilarity = similarity;
              similarBranch = branch;
            }
          }
        });

        return similarBranch;
      };

      const similarBranch = findSimilarBranches(result, 0.7);
      if (similarBranch) {
        handleSetBranch(similarBranch);
      } else {
        fetchData(result);
      }

      setResult('');
    }
  }, [result, setResult, branches]);

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
        {isLoading ? (
          <div className='flex flex-wrap justify-around gap-3 items-start '>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className='flex flex-col gap-3 w-full'>
                <Skeleton className='h-[100px] w-full rounded-xl' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-[250px]' />
                  <Skeleton className='h-4 w-[200px]' />
                </div>
              </div>
            ))}
          </div>
        ) : branches.length > 0 ? (
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
            데이터가 없습니다.
          </div>
        )}
      </div>
      <SpeechToText autoStart={autoStart} placeholder='영업점을 선택해주세요' />
    </div>
  );
}
