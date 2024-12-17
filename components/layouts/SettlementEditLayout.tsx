import { useSettlementContext } from '@/contexts/SettlementContext';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import SpeechToText from '../SpeechToText';
import Header from '../atoms/Header';

const steps = ['/step1', '/step2', '/step3', '/step4', '/step5'];

export default function SettlementEditLayout({ children }: PropsWithChildren) {
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
      {pathname.includes('/keyword/edit/settlement/step1') &&
      formData.fromAccount ? (
        <Header
          text='키워드 수정하기'
          onBack={() => {
            router.back();
          }}
          actionLabel='다음'
          onAction={() => {
            router.push('/keyword/edit/settlement/step2');
          }}
        />
      ) : pathname.startsWith('/keyword/edit/settlement/step2') &&
        formData.members.length ? (
        <Header
          text='키워드 수정하기'
          onBack={() => {
            router.push('/keyword/edit/settlement/step1');
          }}
          actionLabel='다음'
          onAction={() => {
            router.push('/keyword/edit/settlement/step3');
          }}
        />
      ) : (
        <Header
          text='키워드 수정하기'
          onBack={() => {
            if (prevStep) router.push(prevStep);
          }}
          showActionButton={false}
        />
      )}
      <div className='flex flex-col flex-grow p-[20px] pb-24 h-full overflow-hidden'>
        {children}

        {/* 마지막 페이지에서 Mic 안나오게 */}
        {!pathname.startsWith('/keyword/edit/settlement/step5') && (
          <SpeechToText />
        )}
      </div>
    </div>
  );
}
