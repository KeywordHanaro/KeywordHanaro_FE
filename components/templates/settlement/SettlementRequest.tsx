'use client';

import { MoneyInputRef } from '@/components/atoms/Inputs';
import { ChipsList } from '@/components/molecules/ChipList';
import { Member } from '@/data/member';
import { useState, useRef } from 'react';

export default function SettlementRequest({
  setMoneyResult,
  handleStep,
  accountName,
  setMembersResult,
  initMember,
}: {
  setMoneyResult: React.Dispatch<React.SetStateAction<string | null>>;
  setMembersResult: React.Dispatch<React.SetStateAction<Member[]>>;
  handleStep: () => void;
  accountName: string;
  initMember: Member[];
}) {
  const [members, setMembers] = useState<Member[]>(initMember);
  const [deleteMember, setDeleteMember] = useState<Member[]>([]);
  const moneyRef = useRef<HTMLInputElement>(null);

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter((member) => id !== member.id));
    setDeleteMember((prev) => [
      ...prev,
      ...members.filter((member) => id === member.id),
    ]);
  };

  const handleSubmit = ({
    money,
    members,
  }: {
    money: string;
    members: Member[];
  }) => {
    setMoneyResult(money);
    setMembersResult(members);
    handleStep();
    console.log('제출시 데이터', money, members);
  };

  return (
    <div className='flex flex-col gap-[30px] pt-[30px]'>
      <p className='text-[24px] font-semibold'>{accountName}로</p>
      <div className='text-[#069894] text-[24px] font-semibold'>
        {members.map((member, idx) =>
          idx !== members.length - 1 ? (
            <span key={member.id} className='mr-[3px]'>
              {member.name},
            </span>
          ) : (
            <span key={member.id}>{member.name}</span>
          )
        )}
        <span className='text-black ml-[3px]'>님에게 정산요청 할게요</span>
      </div>
      <MoneyInputRef placeHolder='얼마를 요청할까요?' ref={moneyRef} />

      {/* 선택된 멤버 */}
      {members.length !== 0 && (
        <div className='flex flex-col gap-[16px]'>
          <h3 className='font-semibold text-[18px]'>선택된 멤버</h3>
          <div className='flex gap-[8px]'>
            <ChipsList
              items={members}
              canDelete={true}
              onRemove={handleDeleteMember}
            />
          </div>
        </div>
      )}

      {/* 제외된 멤버 */}
      {deleteMember.length !== 0 && (
        <div className='flex flex-col gap-[16px]'>
          <h3 className='font-semibold text-[18px]'>제외된 멤버</h3>
          <div className='flex gap-[8px]'>
            <ChipsList
              items={deleteMember}
              className={'text-[#B9B9B9] border-[#B9B9B9]'}
            />
          </div>
        </div>
      )}

      <button
        onClick={() => {
          if (moneyRef?.current?.value)
            handleSubmit({ money: moneyRef?.current?.value, members });
        }}
      >
        임시 제출 버튼
      </button>
    </div>
  );
}
