import { groupMember } from '@/types/Keyword';
import { useState } from 'react';
import { ChipsList } from '../molecules/ChipList';

type MemberSelectorProps = {
  initialMembers: groupMember[];
  onUpdate: (newMemberList: groupMember[]) => void;
};

const MemberSelector = ({ initialMembers, onUpdate }: MemberSelectorProps) => {
  const [members, setMembers] = useState<groupMember[]>(initialMembers);
  const [excludedMembers, setExcludedMembers] = useState<groupMember[]>([]);

  // 멤버 제거 핸들러
  const handleRemoveMember = (tel: string) => {
    const updatedMembers = members.filter((member) => member.tel !== tel);
    const removedMember = members.find((member) => member.tel === tel);

    if (removedMember) {
      setExcludedMembers((prev) => [...prev, removedMember]);
    }
    setMembers(updatedMembers);
    onUpdate(updatedMembers);
  };

  // 멤버 추가 핸들러
  const handleAddMember = (tel: string) => {
    const updatedExcludedMembers = excludedMembers.filter(
      (member) => member.tel !== tel
    );
    const addedMember = excludedMembers.find((member) => member.tel === tel);

    if (addedMember) {
      const newMembers = [...members, addedMember];
      setMembers(newMembers);
      onUpdate(newMembers);
    }
    setExcludedMembers(updatedExcludedMembers);
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
