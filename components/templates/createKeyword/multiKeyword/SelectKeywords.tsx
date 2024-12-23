import SpeechToText from '@/components/SpeechToText';
import Header from '@/components/atoms/Header';
import MultiKeyword from '@/components/molecules/MultiKeyword';
import { MultiKeywordForm } from '@/contexts/MultiKeywordContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { Keyword, keywordList } from '@/data/keyword';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { levenshtein } from '@/lib/utils';

type MultiKeywordProps = {
  formData: MultiKeywordForm;
  onBack: () => void;
  onUpdate: (keywordIdArr: number[]) => void;
};

export default function SelectKeywords({
  formData,
  onBack,
  onUpdate,
}: MultiKeywordProps) {
  const { toast } = useToast();
  const [selectedIds, setSelectedIds] = useState<number[]>(
    formData.keywordIdArr ?? []
  );
  const { result, setResult } = useVoiceInputSession();

  const pathname = usePathname();

  const handleKeywordSelect = useCallback(
    (id: number) => {
      if (selectedIds.includes(id)) {
        setSelectedIds(selectedIds.filter((prevId) => prevId !== id));
      } else if (selectedIds.length >= 5) {
        toast({
          title: '최대 5개까지 선택할 수 있어요',
          description: '',
          variant: 'gray',
        });
      } else {
        setSelectedIds([...selectedIds, id]);
      }
    },
    [toast, selectedIds, setSelectedIds]
  );

  const handleBack = () => {
    onBack();
  };

  const handleNext = () => {
    onUpdate(selectedIds);
  };

  useEffect(() => {
    if (result) {
      const findSimilarKeywords = (input: string, threshold: number = 0.3) => {
        const inputWords = input.toLowerCase().split(' ');
        const similarKeywords: Keyword[] = [];

        keywordList.forEach((keyword) => {
          const keywordWords = keyword.title.toLowerCase().split(' ');
          const keywordLength = keywordWords.length;

          for (let i = 0; i <= inputWords.length - keywordLength; i++) {
            const inputSubset = inputWords
              .slice(i, i + keywordLength)
              .join(' ');
            const distance = levenshtein(
              inputSubset,
              keyword.title.toLowerCase()
            );
            const similarity =
              1 - distance / Math.max(inputSubset.length, keyword.title.length);

            if (similarity >= threshold) {
              similarKeywords.push(keyword);
              break;
            }
          }
        });

        return similarKeywords;
      };

      const similarKeywords = findSimilarKeywords(result, 0.7);
      const newSelectedIds = similarKeywords.map((keyword) => keyword.id);

      setSelectedIds((prev) => {
        const uniqueIds = [...prev, ...newSelectedIds];
        return uniqueIds.slice(0, 5); // 최대 5개까지만 선택
      });

      setResult('');
    }
  }, [result, setResult]);

  return (
    <div className='flex flex-col h-full'>
      {/* 헤더 */}
      {selectedIds.length >= 2 ? (
        <Header
          text='멀티 키워드 생성하기'
          onBack={handleBack}
          actionLabel='다음'
          onAction={handleNext}
        />
      ) : (
        <Header
          text='멀티 키워드 생성하기'
          showBackButton={!pathname.includes('/step4')}
          onBack={handleBack}
          showActionButton={false}
        />
      )}
      <div className='font-semibold text-[24px] pl-5 pt-6'>
        조합할 키워드를 <br></br>설정해주세요
      </div>
      <div className='font-medium text-lightGray pl-5 pt-[11px]'>
        최소 <span className='text-hanaPrimary'>2개</span>부터 최대{' '}
        <span className='text-hanaPrimary'>5개</span>까지 선택 가능해요
      </div>
      {/* 키워드 리스트 */}
      <div className='flex flex-col flex-grow overflow-y-scroll pt-[27px] px-5 pb-24 gap-2.5'>
        {keywordList.map((each) => (
          <MultiKeyword
            key={each.id}
            data={each}
            onClick={() => handleKeywordSelect(each.id)}
            isSelected={selectedIds.includes(each.id)}
          />
        ))}
      </div>
      <SpeechToText autoStart placeholder='조합할 키워드를 설정해주세요' />
    </div>
  );
}
