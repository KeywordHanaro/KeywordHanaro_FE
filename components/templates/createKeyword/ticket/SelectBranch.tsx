'use client';

import SpeechToText from '@/components/SpeechToText';
import { SearchInpuRef } from '@/components/atoms/Inputs';
import BankInfoItem from '@/components/molecules/BankInfoItem';
import { Skeleton } from '@/components/ui/skeleton';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { Branch } from '@/data/bank';
import { useEffect, useRef, useState } from 'react';

export default function SelectBranch({
  handleSetBranch,
}: {
  handleSetBranch: (data: Branch) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  // const [searchQuery, setSearchQuery] = useState('');
  const { result, setResult } = useVoiceInputSession();
  // console.log(searchQuery);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchNearbyBranches(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchNearbyBranches = async (
    lat: number,
    lng: number,
    query?: string
  ) => {
    try {
      const response = await fetch(
        `/api/branches/nearby?lat=${lat}&lng=${lng}${query ? `&query=${query}` : ''}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch nearby branches');
      }
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error('Error fetching nearby branches:', error);
    }
  };

  const handleSearch = () => {
    if (inputRef?.current?.value) {
      // setSearchQuery(inputRef.current.value);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchNearbyBranches(
            position.coords.latitude,
            position.coords.longitude,
            inputRef.current?.value
          );
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    }
  };

  const handleClick = (branch: Branch) => {
    handleSetBranch(branch);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (result) {
      // setSearchQuery(result);
      if (inputRef.current) {
        inputRef.current.value = result;
      }
      setResult('');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchNearbyBranches(
            position.coords.latitude,
            position.coords.longitude,
            result
          );
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    }
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
                key={branch.branchId}
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
      <SpeechToText />
    </div>
  );
}
