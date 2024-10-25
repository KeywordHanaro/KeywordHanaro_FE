// 'use client';
import CheckBox from '@/components/atoms/CheckBox';
import term1 from '@/public/images/Terms/LocationTerms1.png';
import term2 from '@/public/images/Terms/LocationTerms2.png';
import { SlArrowRight } from 'react-icons/sl';
import Image from 'next/image';

// import { useState } from 'react';

export default function LocationAgreement({
  isCheck,
  isTerms,
  setIsCheck,
  handelTerms,
}: {
  isCheck: boolean;
  isTerms: boolean;
  setIsCheck: React.Dispatch<React.SetStateAction<boolean>>;
  handelTerms: () => void;
}) {
  // const [isCheck, setIsCheck] = useState(false);
  // const [isTerms, setIsTerms] = useState(false);

  // const handelTerms = () => {
  //   setIsTerms((pre) => !pre);
  // };

  return (
    <div className='w-full flex flex-col gap-[24px]'>
      <p className='text-[24px] font-semibold'>위치 기반 서비스 이용 동의</p>
      {isTerms ? (
        <div className='w-full h-full pb-[44px]'>
          <Image
            src={term1}
            alt='LocationTerms1'
            className='border border-black'
          />
          <Image
            src={term2}
            alt='LocationTerms2'
            className='border border-black'
          />
        </div>
      ) : (
        <>
          <div className='flex flex-col'>
            <p className='text-[20px] font-semibold'>
              번호표발행 서비스 이용을 위해
            </p>
            <p className='text-[20px] font-semibold'>
              이용 약관에 동의해 주세요
            </p>
          </div>

          <div className='flex items-center justify-between p-[16px] border-[2px] border-[#88899D4D] rounded-[8px]'>
            <div className='flex gap-[12px]'>
              <CheckBox checked={isCheck} onChange={setIsCheck} />
              <p>위치 기반 서비스 사용 약관 동의</p>
            </div>
            <SlArrowRight
              className='w-[16px] h-[16px] text-[#8E8E93] cursor-pointer'
              onClick={handelTerms}
            />
          </div>

          <p className='text-[#828282] text-[15px] font-normal'>
            하나은행 위치 기반 서비스 이용 약관에 1회 동의 하시면, 서비스 이용
            시점 위치를 기준으로 주변의 하나은행 영업점/ATM을 찾을 수 있습니다.
          </p>
        </>
      )}
    </div>
  );
}
