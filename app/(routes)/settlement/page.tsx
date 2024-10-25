'use client';

import Header from '@/components/atoms/Header';
import SettlementCompletion from '@/components/templates/settlement/SettlementCompletion';
import SettlementRequest from '@/components/templates/settlement/SettlementRequest';
import { Member } from '@/data/member';
import { settlementData } from '@/data/settlement';
import { useState } from 'react';

export default function SettlementPage() {
  const [step, setStep] = useState(1);
  const [moneyResult, setMoneyResult] = useState<string | null>(null);
  const [membersResult, setMembersResult] = useState<Member[]>([]);

  const handleStep = () => {
    setStep((pre) => pre + 1);
  };

  return (
    <div className='w-full h-full flex flex-col relative px-[20px]'>
      <Header text='키워드 정산' showActionButton={false} />
      {step === 1 && (
        <SettlementRequest
          setMoneyResult={setMoneyResult}
          handleStep={handleStep}
          setMembersResult={setMembersResult}
          accountName={settlementData.MyAccount.accountName}
          initMember={settlementData.Members}
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
  );
}
