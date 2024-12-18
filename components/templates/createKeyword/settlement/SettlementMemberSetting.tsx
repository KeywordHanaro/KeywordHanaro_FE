'use client';

import { DefaultInputRef } from '@/components/atoms/Inputs';
import { ChipsList } from '@/components/molecules/ChipList';
import ContactItem from '@/components/molecules/ContactListItem';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { Member, MemberList } from '@/data/member';
import { FormData } from '@/data/settlement';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { levenshtein } from '@/lib/utils';

type SettlementMemberSettingProps = {
  formData: FormData;
  onUpdate: (members: Member[]) => void;
};

export default function SettlementMemberSetting({
  formData,
  onUpdate,
}: SettlementMemberSettingProps) {
  const [selectedMember, setSelectedMember] = useState<Member[]>(
    formData.members ?? []
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchRef = useRef<HTMLInputElement>(null);
  const { result, setResult } = useVoiceInputSession();

  useEffect(() => {
    onUpdate(selectedMember);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMember]); // onUpdate를 의존성 배열에서 제거

  const handleDeleteMember = useCallback((id: number) => {
    setSelectedMember((prevMembers) =>
      prevMembers.filter((member) => id !== member.id)
    );
  }, []);

  const handleToggleSelect = useCallback((id: number) => {
    setSelectedMember((prev) => {
      const isAlreadySelected = prev.some((member) => member.id === id);
      if (isAlreadySelected) {
        return prev.filter((member) => member.id !== id);
      } else {
        const newMember = MemberList.find((member) => member.id === id);
        return newMember ? [...prev, newMember] : prev;
      }
    });
    if (searchRef.current) {
      searchRef.current.value = '';
    }
    setSearchQuery('');
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log('e.target.value', e.target.value);
  };

  const filteredMembers = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const results = MemberList.filter(
      (member) =>
        member.name.toLowerCase().includes(lowercasedQuery) ||
        member.phoneNumber.replaceAll('-', '').includes(lowercasedQuery)
    );

    return results.length > 0 ? results : selectedMember;
  }, [searchQuery, selectedMember]);

  // useEffect(() => {
  //   if (result) {
  //     const threshold = 1; // 허용할 최대 편집 거리
  //     let bestMatch = null;
  //     let minDistance = Infinity;

  //     for (const member of MemberList) {
  //       const distance = levenshtein(
  //         member.name.toLowerCase(),
  //         result.toLowerCase()
  //       );
  //       if (distance < minDistance && distance <= threshold) {
  //         minDistance = distance;
  //         bestMatch = member;
  //       }
  //     }

  //     if (bestMatch) {
  //       setResult('');
  //       handleToggleSelect(bestMatch.id);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [result]);

  useEffect(() => {
    if (result) {
      const names = result.split(' ').filter((name) => name.trim() !== '');
      const threshold = 1; // 허용할 최대 편집 거리

      const newSelectedMembers = names.reduce((acc: Member[], name: string) => {
        let bestMatch = null;
        let minDistance = Infinity;

        for (const member of MemberList) {
          const distance = levenshtein(
            member.name.toLowerCase(),
            name.toLowerCase()
          );
          if (distance < minDistance && distance <= threshold) {
            minDistance = distance;
            bestMatch = member;
          }
        }

        if (bestMatch && !acc.some((m) => m.id === bestMatch!.id)) {
          acc.push(bestMatch);
        }
        return acc;
      }, []);

      setSelectedMember((prev) => {
        const uniqueMembers = [...prev, ...newSelectedMembers].reduce(
          (acc: Member[], current) => {
            if (!acc.some((item) => item.id === current.id)) {
              acc.push(current);
            }
            return acc;
          },
          []
        );
        return uniqueMembers;
      });

      setResult('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className='flex flex-col w-full h-full gap-[24px]'>
      {/* 메인 문구 */}
      <h1 className='font-semibold text-[24px]'>정산 멤버를 설정해주세요</h1>

      {/* 이름/전화번호 입력창 */}
      <DefaultInputRef
        placeHolder='이름 / 전화번호를 입력해주세요'
        value={searchQuery}
        ref={searchRef}
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
      <div className='flex flex-col h-full overflow-y-scroll'>
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
