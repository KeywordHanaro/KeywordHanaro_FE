'use client';

import Header from '@/components/atoms/Header';
import { MicRef } from '@/components/atoms/Mic';
import { MyAccountItemProps } from '@/components/molecules/AccountListItem';
import KeywordCompletion from '@/components/templates/KeywordCompletion';
import KeywordInputButton from '@/components/templates/KeywordInputButton';
import SelectAccount from '@/components/templates/SelectAccount';
import SetActionCategory from '@/components/templates/createKeyword/settlement/SetActionCategory';
import SetKeywordComplete from '@/components/templates/createKeyword/settlement/SetKeywordComplete';
import SettlementMemberSetting from '@/components/templates/createKeyword/settlement/SettlementMemberSetting';
import { Member, MemberList } from '@/data/member';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type FormData = {
  account: MyAccountItemProps;
  members: Member[];
  category: 'Settlement' | 'Dues';
  checkEveryTime: boolean;
  amount: string;
  keywordName: string;
};

export default function KeywordCreateSettlementPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    account: { accountName: '', accountNumber: '', bankId: 0 },
    members: [],
    category: 'Settlement',
    checkEveryTime: false,
    amount: '',
    keywordName: '',
  });
  const [selectedMember, setSelectedMember] = useState<Member[]>([]);
  const router = useRouter();
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleOnBack = () => {
    if (step === 1) router.back();
    else prevStep();
  };

  const handleOnNext = () => {
    updateFormData(formData);
    nextStep();
  };

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <div className='w-full h-full relative'>
      {/* Header 2번째 페이지만 selectedMember가 있으면 다음 버튼 출현 */}
      {step === 2 && formData.members.length !== 0 ? (
        <Header
          text='키워드 생성하기'
          onBack={handleOnBack}
          actionLabel='다음'
          onAction={handleOnNext}
        />
      ) : (
        <Header
          text='키워드 생성하기'
          onBack={handleOnBack}
          showActionButton={false}
        />
      )}

      <div className='p-[20px]'>
        {/* 1. 계좌 선택 */}
        {step === 1 && (
          <SelectAccount
            onUpdate={(account) => updateFormData({ account })}
            onNext={nextStep}
          />
        )}

        {/* 2. 연락처에서 멤버 선택 */}
        {step === 2 && (
          <SettlementMemberSetting
            onUpdate={(members) => updateFormData({ members })}
          />
        )}

        {/* 3. 정산, 회비 유형 선택 및 금액, 매번 요청 여부 선택 */}
        {step === 3 && (
          <SetActionCategory
            formData={formData}
            onUpdate={updateFormData}
            onNext={nextStep}
          />
        )}

        {/* 4. 키워드 이름 입력 */}
        {step === 4 && (
          <KeywordInputButton
            placeHolder={'키워드 이름을 작성해주세요'}
            title={'키워드 이름을 설정해주세요'}
            onUpdate={(keywordName) => updateFormData({ keywordName })}
            onNext={nextStep}
          />
        )}

        {/* 5. 키워드 생성 완료 페이지 */}
        {step === 5 && (
          <KeywordCompletion onClick={() => router.push('/')}>
            <SetKeywordComplete formData={formData} />
          </KeywordCompletion>
        )}
      </div>

      {/* 마지막 페이지에서 Mic 안나오게 */}
      {step !== 5 && <MicRef />}
    </div>
  );
}
