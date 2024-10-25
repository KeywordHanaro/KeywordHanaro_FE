'use client';

import { MoneyInputRef } from '@/components/atoms/Inputs';
import { ChipsList } from '@/components/molecules/ChipList';
import { Member } from '@/data/member';
import { settlementData } from '@/data/settlement';
import { useState } from 'react';

export default function SettlementRequest() {
  const [members, setMembers] = useState<Member[]>(settlementData.Members);
  const [deleteMember, setDeleteMember] = useState<Member[]>([]);

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter((member) => id !== member.id));
    setDeleteMember((prev) => [
      ...prev,
      ...members.filter((member) => id === member.id),
    ]);
  };

  return (
    <div className='flex flex-col gap-[30px] pt-[30px]'>
      <p className='text-[24px] font-semibold'>
        {settlementData.myAccunt.accountName}로
      </p>
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
      <MoneyInputRef placeHolder='얼마를 요청할까요?' />

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
            <ChipsList items={deleteMember} />
          </div>
        </div>
      )}
    </div>
  );
}
