import { Member } from '@/data/member';
import React, { useState } from 'react';
import { ChipsList } from '../molecules/ChipList';

type MemberSelectorProps = {
  initialMembers: Member[];
  onUpdate: (newMemberList: Member[]) => void;
};

const MemberSelector: React.FC<MemberSelectorProps> = ({
  initialMembers,
  onUpdate,
}) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [excludedMembers, setExcludedMembers] = useState<Member[]>([]);

  // 멤버 제거 핸들러
  const handleRemoveMember = (id: number) => {
    const updatedMembers = members.filter((member) => member.id !== id);
    const removedMember = members.find((member) => member.id === id);

    if (removedMember) {
      setExcludedMembers((prev) => [...prev, removedMember]);
    }
    setMembers(updatedMembers);
    onUpdate(updatedMembers);
  };

  // 멤버 추가 핸들러
  const handleAddMember = (id: number) => {
    const updatedExcludedMembers = excludedMembers.filter(
      (member) => member.id !== id
    );
    const addedMember = excludedMembers.find((member) => member.id === id);

    if (addedMember) {
      setMembers((prev) => [...prev, addedMember]);
    }
    setExcludedMembers(updatedExcludedMembers);
    onUpdate(members);
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* 선택된 멤버 */}
      {members.length > 0 && (
        <div>
          <h3 className='font-semibold text-lg mb-2'>선택된 멤버</h3>
          <div className='flex flex-wrap gap-2'>
            <ChipsList
              items={members}
              canDelete={true}
              onRemove={handleRemoveMember}
            />
          </div>
        </div>
      )}

      {/* 제외된 멤버 */}
      {excludedMembers.length > 0 && (
        <div>
          <h3 className='font-semibold text-lg mb-2'>제외된 멤버</h3>
          <div className='flex flex-wrap gap-2'>
            <ChipsList
              items={excludedMembers}
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

export default MemberSelector;
