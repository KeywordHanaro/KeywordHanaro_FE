'use client';

import LoadingKakao from '@/components/atoms/LoadingKakao';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { FormData } from '@/data/settlement';
import { useSettlementApi } from '@/hooks/useSettlement/useSettlement';
// import { activateSettlement } from '@/types/SettlementRequest';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GetKakao() {
  const searchParams = useSearchParams();
  const { updateFormData, updateResponse } = useSettlementContext();
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();
  const { sendMessage } = useSettlementApi();

  useEffect(() => {
    const loadLocalStorage = (key: string) => {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data) as FormData;
      }
    };
    const data = loadLocalStorage('settlement');
    console.log('🚀  useEffect  data:', data);
    setProgress(25);
    if (data) {
      updateFormData(data);
    } else {
      return;
    }
    // console.log(data);

    const account = {
      accountNumber: data.fromAccount.accountNumber,
      name: data.fromAccount.accountName,
    };

    const groupMembers = data.members.map((member) => ({
      name: member.name,
      tel: member.tel,
    }));
    setProgress(50);
    // const members = JSON.stringify(groupMembers);

    const send = async () => {
      try {
        const code = searchParams?.get('code');
        if (code === null) {
          throw new Error('code is null');
        }
        const reqBody = {
          code: code,
          amount: parseInt(data.amount.replaceAll(',', '')),
          account: account,
          groupMember: groupMembers,
          type: data.category,
        };
        console.log('🚀  send  reqBody:', reqBody);

        console.log('🚀  send  groupMembers:', groupMembers);
        await sendMessage(reqBody)
          .then(() => {
            setProgress(90);
            const jsonInit = localStorage.getItem('initialData');
            if (jsonInit) {
              if (updateResponse) {
                updateResponse(JSON.parse(jsonInit));
              }
            }
            setProgress(100);
          })
          .catch(() => {});

        router.push('/settlement/step2');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setProgress(75);
    send();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className='flex flex-col items-center h-full'>
        <h1 className='text-xl font-bold mt-10 mb-10'>
          멤버에게 카카오톡 메시지를 보내는 중이에요
        </h1>
        <LoadingKakao progress={progress} />
      </div>
    </>
  );
}
