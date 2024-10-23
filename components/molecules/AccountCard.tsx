'use client';

import { useState } from 'react';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';

type AccountCardProps = {
  title: string;
  accountNumber: string;
  balance: string;
};

export default function AccountCard({
  title,
  accountNumber,
  balance,
}: AccountCardProps) {
  const [isHide, setIsHide] = useState(false);
  return (
    <Card className='flex flex-col w-[331px] h-[201px] p-[20px] justify-between'>
      {/* 제목 및 계좌 번호 및 잔액 */}
      <div className='flex flex-col justify-between'>
        {/* 제목 */}
        <h1 className='font-semibold text-[18px] mb-[10px] h-[21px] text-[#272727]'>
          {title}
        </h1>

        {/* 계좌 번호 및 복사 버튼 */}
        <div className='flex font-semibold text-[12px] mb-[10px] text-[#616161] '>
          {accountNumber}
          <button
            className='font-semibold text-[12px] text-[#616161] ml-[5px]'
            onClick={() => {
              window.navigator.clipboard.writeText(accountNumber).then(() => {
                alert('복사되었습니다.');
              });
            }}
          >
            복사
          </button>
        </div>

        {/* 잔액 및 숨김 버튼 */}
        <div className='flex items-center'>
          {/* 잔액 */}
          {isHide ? (
            <div className='flex items-center h-[36px]'>
              <h3 className='text-subGray font-bold text-[25px] mr-[5px]'>
                금액 숨김
              </h3>
            </div>
          ) : (
            <div className='flex items-center h-[36px]'>
              <h2 className='font-bold text-[30px] mr-[5px]'>
                {Number(balance).toLocaleString()}
              </h2>
              <span className='font-semibold text-[25px] mr-[5px]'>원</span>
            </div>
          )}

          {/* 숨김 버튼 */}
          <button
            className='rounded-lg w-[30px] h-[20px] bg-[#EAE9EE] text-[#6F6F6F] text-[10px] font-bold'
            onClick={() => {
              setIsHide((pre) => !pre);
            }}
          >
            {isHide ? '보기' : '숨김'}
          </button>
        </div>
      </div>

      {/* 가져오기, 보내기, ... 버튼 */}
      <div className='flex'>
        <Button className='rounded-lg bg-[#EFF0F4] text-fontBlack w-[116px] h-[40px] mr-[9px] flex items-center justify-center'>
          가져오기
        </Button>
        <Button className='rounded-lg w-[116px] h-[40px] mr-[13px] flex items-center justify-center'>
          보내기
        </Button>
        <Button
          className='rounded-lg bg-[#EFF0F4] text-[#666668] !h-[40px] !w-[40px] flex items-center justify-center'
          style={{ boxShadow: '0px 4px 8px 0px rgba(136, 137, 157, 0.30)' }}
        >
          ...
        </Button>
      </div>
    </Card>
  );
}
