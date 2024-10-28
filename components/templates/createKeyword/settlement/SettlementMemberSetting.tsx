'use client';

import { FormData } from '@/app/(routes)/keyword/create/settlement/page';
import { DefaultInputRef } from '@/components/atoms/Inputs';
import { ChipsList } from '@/components/molecules/ChipList';
import ContactItem from '@/components/molecules/ContactListItem';
import { Member, MemberList } from '@/data/member';
import { useState, useMemo } from 'react';

type SettlementMemberSettingProps = {
  onUpdate: (members: Member[]) => void;
};

export default function SettlementMemberSetting({
  onUpdate,
}: SettlementMemberSettingProps) {
  const [selectedMember, setSelectedMember] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleDeleteMember = (id: number) => {
    setSelectedMember(selectedMember.filter((member) => id !== member.id));
    onUpdate(selectedMember);
    console.log(selectedMember);
  };

  const handleToggleSelect = (id: number) => {
    setSelectedMember((prev) => {
      const isAlreadySelected = prev.some((member) => member.id === id);
      if (isAlreadySelected) {
        return prev.filter((member) => member.id !== id);
      } else {
        const newMember = MemberList.find((member) => member.id === id);
        return newMember ? [...prev, newMember] : prev;
      }
    });
    onUpdate(selectedMember);

    setSearchQuery('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredMembers = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const results = MemberList.filter((member) =>
      member.name.toLowerCase().includes(lowercasedQuery)
    );
    return results.length > 0 ? results : selectedMember;
  }, [searchQuery, selectedMember]);

  return (
    <div className='flex flex-col w-full gap-[24px]'>
      {/* 메인 문구 */}
      <h1 className='font-semibold text-[24px]'>정산 멤버를 설정해주세요</h1>

      {/* 이름/전화번호 입력창 */}
      <DefaultInputRef
        placeHolder='이름 / 전화번호를 입력해주세요'
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* 선택된 멤버 */}
      {selectedMember.length !== 0 && (
        <div className='flex flex-col gap-[16px]'>
          <h3 className='font-semibold text-[18px]'>선택된 멤버</h3>
          <div className='flex gap-[8px]'>
            <ChipsList
              items={selectedMember}
              canDelete={true}
              onRemove={handleDeleteMember}
            />
          </div>
        </div>
      )}

      {/* 연락처 */}
      <div className='flex flex-col'>
        {filteredMembers.map((member) => (
          <ContactItem
            key={member.id}
            member={member}
            isSelected={selectedMember.some(
              (selected) => selected.id === member.id
            )}
            onChange={() => handleToggleSelect(member.id)}
          />
        ))}
      </div>
    </div>
  );
}
