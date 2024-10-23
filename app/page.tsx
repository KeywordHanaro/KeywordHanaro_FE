import { MicRef } from '@/components/atoms/Mic';
import AccountCard from '@/components/molecules/AccountCard';
import Keyword from '@/components/molecules/Keyword';
import { Toggle } from '@/components/ui/toggle';
import { BsPerson } from 'react-icons/bs';
import { SlArrowRight } from 'react-icons/sl';

export default function Home() {
  const tempData = [
    {
      id: 1,
      type: 'transfer' as 'transfer' | 'inquiry' | 'ticket' | 'settlement',
      title: '성엽이 용돈',
      description: '정성엽 > 5만원',
      isFavorite: true,
    },
    {
      id: 2,
      type: 'inquiry' as 'transfer' | 'inquiry' | 'ticket' | 'settlement',
      title: '월급 확인',
      description: '조회 > 급여',
      isFavorite: true,
    },
    {
      id: 3,
      type: 'ticket' as 'transfer' | 'inquiry' | 'ticket' | 'settlement',
      title: '번호표',
      description: '번호표 > 성수역점',
      isFavorite: false,
    },
    {
      id: 4,
      type: 'settlement' as 'transfer' | 'inquiry' | 'ticket' | 'settlement',
      title: '월세내줘',
      description: '송금 > 집주인 > 50만원',
      isFavorite: true,
    },
    {
      id: 5,
      type: 'transfer' as 'transfer' | 'inquiry' | 'ticket' | 'settlement',
      title: '아빠 용돈',
      description: '송금 > 박준용 > 금액 미정',
      isFavorite: true,
    },
  ];

  return (
    <div className='h-screen relative bg-[#F6F7F9]'>
      {/* 헤더 시작 */}
      <div className='w-full h-[60px] flex px-[30px] items-center justify-between bg-white'>
        <a href='#'>
          <BsPerson className='w-[30px] h-[30px] cursor-pointer' />
        </a>
        <div className='flex items-center'>
          <Toggle className='mr-[15px]' />
          <a href='#' className='mr-[15px]'>
            지갑
          </a>
          <a href='#'>알림</a>
        </div>
      </div>
      {/* 헤더 끝 */}

      <div className='px-[20px] flex flex-col items-center py-[10px]'>
        {/* 카드 */}
        <AccountCard
          title='터틀넥즈감자탕식비'
          accountNumber='000-000000-00000'
          balance='1000000'
        />
        {/* 카드 끝 */}

        {/* 나의 키워드 */}
        <div className='w-full h-[451px] flex flex-col gap-[8px] mb-[8px] mt-[20px]'>
          {/* 나의 키워드 헤더 */}
          <div className='flex w-full justify-between'>
            <p className='text-[18px] font-semibold'>나의 키워드</p>
            <a href='/keyword'>
              <SlArrowRight className='cursor-pointer' />
            </a>
          </div>
          {/* 나의 키워드 헤더 끝 */}
          {
            // 여기에 나의 키워드 5개 불러와야함
            tempData.map((data, idx) => (
              <Keyword key={idx} data={data} />
            ))
          }
        </div>
        {/* 나의 키워드 끝 */}
      </div>

      <MicRef />
    </div>
  );
}
