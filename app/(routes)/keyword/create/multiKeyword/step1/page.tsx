'use client';

import SelectKeywords from '@/components/templates/createKeyword/multiKeyword/SelectKeywords';
import { useMultiKeywordForm } from '@/contexts/MultiKeywordContext';
import { UseKeywordResponse } from '@/types/Keyword';
import { useRouter } from 'next/navigation';

export default function Step1() {
  const { formData, updateFormData } = useMultiKeywordForm();

  const router = useRouter();

  const handleBack = () => {
    router.push('/keyword/create');
  };

  return (
    <SelectKeywords
      formData={formData}
      onBack={handleBack}
      onUpdate={(keywordIdArr: number[], keywordList: UseKeywordResponse[]) => {
        updateFormData({ keywordIdArr, keywordList });
        router.push('/keyword/create/multiKeyword/step2');
      }}
    />
  );
}
