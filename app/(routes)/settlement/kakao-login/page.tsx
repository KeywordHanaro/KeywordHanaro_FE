'use client';

import { useSettlementContext } from '@/contexts/SettlementContext';
import { FormData } from '@/data/settlement';
// import { activateSettlement } from '@/types/SettlementRequest';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function GetKakao() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { updateFormData } = useSettlementContext();
  const router = useRouter();

  useEffect(() => {
    const loadLocalStorage = (key: string) => {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data) as FormData;
      }
    };
    const data = loadLocalStorage('settlement');
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
      tel: member.phoneNumber,
    }));

    // const members = JSON.stringify(groupMembers);

    const sendMessage = async () => {
      try {
        const code = searchParams.get('code');
        if (code === null) {
          throw new Error('code is null');
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/settlement/message`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.user.jwt}`,
            },
            body: JSON.stringify({
              code: code,
              amount: parseInt(data.amount),
              account: account,
              groupMember: groupMembers,
              type: data.category
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        router.push('/settlement/step2');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    sendMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        <h1>멤버에게 카카오톡 메시지를 보내는 중이에요</h1>
      </div>
    </>
  );
}
