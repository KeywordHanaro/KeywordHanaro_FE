'use client';

import { MoneyInputRef } from '@/components/atoms/Inputs';
import { ChipsList } from '@/components/molecules/ChipList';
import { Member } from '@/data/member';
import { FormData } from '@/data/settlement';
import { useState, useRef, useEffect } from 'react';
import { formatNumberWithCommas } from '@/lib/utils';

const SettlementRequest = ({
  formData,
  onUpdate,
}: {
  formData: FormData;
  onUpdate: (newData: Partial<FormData>) => void;
}) => {
  const [members, setMembers] = useState<Member[]>(formData.members);
  const [deleteMember, setDeleteMember] = useState<Member[]>([]);
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onUpdate({ members });
  }, [members]); // onUpdate를 의존성 배열에서 제거

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter((member) => id !== member.id));
    setDeleteMember((prev) => [
      ...prev,
      ...members.filter((member) => id === member.id),
    ]);
  };

  const handleAddMember = (id: number) => {
    setDeleteMember(deleteMember.filter((member) => id !== member.id));
    setMembers((prev) => [
      ...prev,
      ...deleteMember.filter((member) => id === member.id),
    ]);
  };

  return (
    <div className='flex flex-col gap-[30px] pt-[30px] px-[20px]'>
      {/* 계좌번호 및 선택된 멤버 글자 출력 */}
      <p className='text-[24px] font-semibold'>
        {formData.account.accountName}로
      </p>
      <div className='text-[#069894] text-[24px] font-semibold break-keep'>
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

      {formData.checkEveryTime ? (
        <MoneyInputRef
          placeHolder='얼마를 요청할까요?'
          ref={amountRef}
          onChange={() =>
            onUpdate({
              amount: formatNumberWithCommas(amountRef.current?.value ?? ''),
            })
          }
        />
      ) : (
        <p className='text-[24px] text-hanaPrimary font-semibold'>
          {formData.amount} 원
        </p>
      )}

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
              canAdd={true}
              onRemove={handleAddMember}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SettlementRequest;
