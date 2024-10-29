import { useSettlementContext } from '@/contexts/SettlementContext';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import Header from '../atoms/Header';
import { MicRef } from '../atoms/Mic';

const steps = ['/step1', '/step2', '/step3', '/step4', '/step5'];

export default function SettlementLayout({ children }: PropsWithChildren) {
  const { formData } = useSettlementContext();
  const pathname = usePathname();
  const path = '/' + pathname.split('/')[4];
  const currentIndex = steps.indexOf(path);
  const router = useRouter();

  const prevStep =
    currentIndex > 0
      ? '/keyword/create/settlement/' + steps[currentIndex - 1]
      : '/';
  return (
    <div className='flex flex-col h-full'>
      {/* Header 2번째 페이지만 selectedMember가 있으면 다음 버튼 출현 */}
      {pathname.startsWith('/keyword/create/settlement/step2') &&
      formData.members.length ? (
        <Header
          text='키워드 생성하기'
          onBack={() => {
            router.push('/keyword/create/settlement/step1');
          }}
          actionLabel='다음'
          onAction={() => {
            router.push('/keyword/create/settlement/step3');
          }}
        />
      ) : (
        <Header
          text='키워드 생성하기'
          onBack={() => {
            if (prevStep) router.push(prevStep);
          }}
          showActionButton={false}
        />
      )}
      <div className='flex flex-col flex-grow p-[20px] pb-24 h-full overflow-hidden'>
        {children}

        {/* 마지막 페이지에서 Mic 안나오게 */}
        {!pathname.startsWith('/keyword/create/settlement/step5') && <MicRef />}
      </div>
    </div>
  );
}
