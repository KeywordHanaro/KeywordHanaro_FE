'use client';

import SpeechToText from '@/components/SpeechToText';
import { Button } from '@/components/atoms/Button';
import { MoneyInputRef } from '@/components/atoms/Inputs';
import { ChipsList } from '@/components/molecules/ChipList';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { FormData } from '@/data/settlement';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { groupMember, SettlementUsageResponse } from '@/types/Keyword';
import { convertKorToNum } from 'korean-number-converter';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useState, useRef, useEffect } from 'react';
import { cn, formatNumberWithCommas } from '@/lib/utils';

export default function SettlementUsageStep1() {
  const rest_api_key = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirect_uri = `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
  const kakao_auth_path = 'https://kauth.kakao.com/oauth/authorize';

  const router = useRouter();
  const { formData, updateFormData } = useSettlementContext();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState<SettlementUsageResponse>();

  const { getKeywordById } = useKeywordApi();
  useEffect(() => {
    const id = searchParams?.get('id');
    if (id) {
      getKeywordById(parseInt(id))
        .then((res) => {
          console.log(res);
          setKeyword(res as SettlementUsageResponse);
        })
        .catch((error) => {
          console.error('정산 키워드 조희 실패:', error);
        });
    }
  }, [searchParams]);

  const [valid, setValid] = useState(
    formData.members.length > 0 && formData.amount !== ''
  );
  const [members, setMembers] = useState<groupMember[]>([]);
  const [deleteMember, setDeleteMember] = useState<groupMember[]>([]);
  const amountRef = useRef<HTMLInputElement>(null);

  const onChange = () => {
    updateFormData({
      amount: amountRef.current?.value.toString() ?? '',
    });
    setValid(
      amountRef.current?.value !== '' && amountRef.current?.value !== '0'
    );
  };

  const handleDeleteMember = (tel: string) => {
    setMembers(members.filter((member) => tel !== member.tel));
    setDeleteMember((prev) => [
      ...prev,
      ...members.filter((member) => tel === member.tel),
    ]);
  };

  const handleAddMember = (tel: string) => {
    setDeleteMember(deleteMember.filter((member) => tel !== member.tel));
    setMembers((prev) => [
      ...prev,
      ...deleteMember.filter((member) => tel === member.tel),
    ]);
  };

  const handleSubmit = () => {
    const saveData = (key: string, value: FormData) => {
      localStorage.setItem(key, JSON.stringify(value));
    };
    saveData('settlement', formData);
    localStorage.setItem('initialData', JSON.stringify(keyword));
    router.push(
      // "/settlement/step2"
      `${kakao_auth_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code&state=${searchParams?.get('id')}`
    );
  };

  useEffect(() => {
    updateFormData({ members });
  }, [members, updateFormData]);

  useEffect(() => {
    if (keyword?.checkEveryTime === true) {
      updateFormData({
        fromAccount: {
          accountName: keyword.account.name,
          bankId: keyword.account.bank.id,
          accountId: 1,
          accountNumber: keyword.account.accountNumber,
          type: 'MyAccount',
        },
        members: keyword.groupMember,
        category: keyword.type === 'SETTLEMENT' ? 'Settlement' : 'Dues',
        checkEveryTime: true,
        amount: '',
        keywordName: keyword.name,
      });
      setMembers(keyword.groupMember);
    }
    if (keyword?.checkEveryTime === false) {
      updateFormData({
        fromAccount: {
          accountName: keyword.account.name,
          bankId: keyword.account.bank.id,
          accountId: 1,
          accountNumber: keyword.account.accountNumber,
          type: 'MyAccount',
        },
        members: keyword.groupMember,
        category: keyword.type === 'SETTLEMENT' ? 'Settlement' : 'Dues',
        checkEveryTime: false,
        amount: keyword.amount.toString(),
        keywordName: keyword.name,
      });
      setValid(true);
      setMembers(keyword.groupMember);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  // STT연동
  const { result, setResult } = useVoiceInputSession();
  useEffect(() => {
    if (result) {
      const cleanedResult = result.replace(/[\s-]/g, '');
      const amountVal = convertKorToNum(cleanedResult);
      if (amountRef.current) {
        amountRef.current.value = amountVal.toLocaleString();
        updateFormData({
          amount: amountRef.current?.value.toString() ?? '',
        });
      }
      setValid(amountVal > 0);
      setResult('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, setResult]);

  return (
    <Suspense>
      <div className='flex flex-col gap-[30px] pt-[30px] px-[20px]'>
        {/* 계좌번호 및 선택된 멤버 글자 출력 */}
        <p className='text-[24px] font-semibold'>
          {formData.fromAccount.accountName}로
        </p>
        <div className='text-[#069894] text-[24px] font-semibold break-keep'>
          {members.map((member, idx) =>
            idx !== members.length - 1 ? (
              <span key={member.tel} className='mr-[3px]'>
                {member.name},
              </span>
            ) : (
              <span key={member.tel}>{member.name}</span>
            )
          )}
          <span className='text-black ml-[3px]'>
            님에게 {keyword?.type === 'SETTLEMENT' ? '정산' : '회비'} 요청
            할게요
          </span>
        </div>

        {formData.checkEveryTime ? (
          <MoneyInputRef
            placeHolder='얼마를 요청할까요?'
            ref={amountRef}
            onChange={onChange}
          />
        ) : (
          <p className='text-[24px] text-hanaPrimary font-semibold'>
            {formatNumberWithCommas(formData.amount)} 원
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

        <Button
          isDisabled={!valid || members.length === 0}
          className={cn('w-full mt-[18px]')}
          onClick={handleSubmit}
        >
          다음
        </Button>
        {keyword?.type === 'SETTLEMENT' && (
          <SpeechToText autoStart placeholder='얼마를 요청할까요?' />
        )}
      </div>
    </Suspense>
  );
}
