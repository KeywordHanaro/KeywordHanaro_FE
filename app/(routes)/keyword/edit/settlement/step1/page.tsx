'use client';

import SelectAccount from '@/components/templates/SelectAccount';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { MemberList } from '@/data/member';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { SettlementUsageResponse } from '@/types/Keyword';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SettlementStep1() {
  const { formData, updateFormData, editId } = useSettlementContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getKeywordById } = useKeywordApi();
  const [keyword, setKeyword] = useState<SettlementUsageResponse>();

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      editId(parseInt(id));
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

  useEffect(() => {
    if (keyword?.checkEveryTime === true) {
      const groupMember = keyword.groupMember.map((member) => ({
        id:
          MemberList.find((person) => person.phoneNumber === member.tel)?.id ??
          0,
        name: member.name,
        phoneNumber: member.tel,
      }));
      updateFormData({
        fromAccount: {
          accountName: keyword.account.name,
          bankId: keyword.account.bank.id,
          accountId: 1,
          accountNumber: keyword.account.accountNumber,
          type: 'MyAccount',
        },
        members: groupMember,
        category: keyword.type === 'SETTLEMENT' ? 'Settlement' : 'Dues',
        checkEveryTime: true,
        amount: '',
        keywordName: keyword.name,
      });
    }
    if (keyword?.checkEveryTime === false) {
      const groupMember = keyword.groupMember.map((member) => ({
        id:
          MemberList.find((person) => person.phoneNumber === member.tel)?.id ??
          0,
        name: member.name,
        phoneNumber: member.tel,
      }));
      updateFormData({
        fromAccount: {
          accountName: keyword.account.name,
          bankId: keyword.account.bank.id,
          accountId: 1,
          accountNumber: keyword.account.accountNumber,
          type: 'MyAccount',
        },
        members: groupMember,
        category: keyword.type === 'SETTLEMENT' ? 'Settlement' : 'Dues',
        checkEveryTime: false,
        amount: keyword.amount.toString(),
        keywordName: keyword.name,
      });
    }
  }, [keyword]);

  const nextStep = () => {
    router.push('/keyword/edit/settlement/step2');
  };

  return (
    <>
      <SelectAccount
        onUpdate={(account) => updateFormData({ fromAccount: account })}
        onNext={nextStep}
        selectedAccount={formData.fromAccount}
      />
    </>
  );
}
