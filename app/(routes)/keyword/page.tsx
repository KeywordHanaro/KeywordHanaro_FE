'use client';

import Header from '@/components/atoms/Header';
import KeywordPageTemplate from '@/components/templates/KeywordPage';
import { VoiceInputProvider } from '@/contexts/VoiceContext';
import { useRouter } from 'next/navigation';

export default function KeywordPage() {
  const router = useRouter();

  const onEdit = () => {
    router.push('/keyword/edit');
  };

  return (
    <div className='flex flex-col h-full'>
      <Header
        text='나의 키워드'
        actionLabel='편집'
        onBack={() => router.push('/')}
        onAction={onEdit}
      />
      <VoiceInputProvider>
        <KeywordPageTemplate />
      </VoiceInputProvider>
    </div>
  );
}
