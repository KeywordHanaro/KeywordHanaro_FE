'use client';

import KeywordCompletion from '@/components/templates/KeywordCompletion';
import SetKeywordComplete from '@/components/templates/createKeyword/settlement/SetKeywordComplete';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useRouter } from 'next/navigation';

export default function SettlementStep5() {
  const { formData } = useSettlementContext();
  const router = useRouter();

  return (
    <KeywordCompletion onClick={() => router.push('/keyword/edit')}>
      <SetKeywordComplete formData={formData} />
    </KeywordCompletion>
  );
}
