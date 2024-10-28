'use client';

import Header from '@/components/atoms/Header';
import SettlementCompletion from '@/components/templates/settlement/SettlementCompletion';
import SettlementRequest from '@/components/templates/settlement/SettlementRequest';
import { Member } from '@/data/member';
import { settlementData } from '@/data/settlement';
import { useState, useRef } from 'react';

export default function SettlementPage() {
  const [step, setStep] = useState(1);
  const [moneyResult, setMoneyResult] = useState<string | null>(null);
  const [membersResult, setMembersResult] = useState<Member[]>([]);
  const settlementRequestRef = useRef<{ submit: () => void } | null>(null);

  const handleStep = () => {
    setStep((pre) => pre + 1);
  };

  const handleSubmit = () => {
    settlementRequestRef.current?.submit();
  };

  return (
    <div className='w-full h-full relative'>
      <Header
        text='키워드 정산'
        showActionButton={step === 1 ? true : false}
        actionLabel={step === 1 ? '다음' : ''}
        onAction={step === 1 ? handleSubmit : undefined}
      />
      <div className='w-full flex flex-col px-[20px]'>
        {step === 1 && (
          <SettlementRequest
            setMoneyResult={setMoneyResult}
            handleStep={handleStep}
            setMembersResult={setMembersResult}
            accountName={settlementData.MyAccount.accountName}
            initMember={settlementData.Members}
            ref={settlementRequestRef}
          />
        )}

        {step === 2 && moneyResult && (
          <SettlementCompletion
            members={membersResult}
            money={moneyResult}
            accountName={settlementData.MyAccount.accountName}
            isAdjustment={settlementData.isAdjustment}
          />
        )}
      </div>
    </div>
  );
}
