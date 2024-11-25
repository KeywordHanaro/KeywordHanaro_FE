'use client';

import { getColorByType, getNameByType, KeywordDetail } from '@/data/keyword';
import { Member } from '@/data/member';
// import { useRef } from 'react';
import { Card } from '../atoms/Card';
import ColorChip from '../atoms/ColorChips';
import { MoneyInputRef } from '../atoms/Inputs';
import MemberSelector from '../organisms/MemberSelector';

type KeywordWithInputsProps = {
  keyword: KeywordDetail;
  onInputChange: (id: number, value: number) => void;
  onMemberListChange: (id: number, memberList: Member[]) => void;
};

const KeywordWithInputs = ({
  keyword,
  onInputChange,
  onMemberListChange,
}: KeywordWithInputsProps) => {
  const chipColor = getColorByType(keyword.type);
  const chipName = getNameByType(keyword.type);

  // const amountRef = useRef<HTMLInputElement>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(keyword.id, Number(e.target.value));
  };

  const handleMemberListChange = (newMemberList: Member[]) => {
    onMemberListChange(keyword.id, newMemberList);
  };

  return (
    <Card className='flex flex-row justify-between items-center rounded-[12px]'>
      <div className='flex flex-col gap-[10px] w-full'>
        <div className='flex gap-2 items-center'>
          <span className='text-fontBlack text-[16px] font-semibold'>
            {keyword.title}
          </span>
          <ColorChip color={chipColor}>{chipName}</ColorChip>
        </div>
        {/* <span className='text-subGray text-[11px]'>{keyword.}</span> */}
        {/* 금액 입력 */}

        {(keyword.type === 'transfer' || keyword.type === 'settlement') && (
          <MoneyInputRef
            // ref={amountRef}
            onChange={handleAmountChange}
            placeHolder={
              keyword.type === 'transfer'
                ? '얼마를 송금할까요?'
                : '얼마를 요청할까요?'
            }
            className='text-base'
          />
        )}

        {(keyword.type === 'settlement' ||
          keyword.type === 'settlementAmount') && (
          <MemberSelector
            initialMembers={keyword.memberList || []}
            onUpdate={handleMemberListChange}
          />
        )}
      </div>
    </Card>
  );
};

export default KeywordWithInputs;
