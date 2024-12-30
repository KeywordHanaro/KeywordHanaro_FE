import SpeechToText from '@/components/SpeechToText';
import Header from '@/components/atoms/Header';
import MultiKeyword from '@/components/molecules/MultiKeyword';
import { MultiKeywordForm } from '@/contexts/MultiKeywordContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { useToast } from '@/hooks/use-toast';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { UseKeywordResponse } from '@/types/Keyword';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { levenshtein } from '@/lib/utils';

type MultiKeywordProps = {
  formData: MultiKeywordForm;
  onBack: () => void;
  onUpdate: (keywordIdArr: number[], keywordList: UseKeywordResponse[]) => void;
};

export default function SelectKeywords({
  formData,
  onBack,
  onUpdate,
}: MultiKeywordProps) {
  const { toast } = useToast();
  const { getAllKeywords } = useKeywordApi();
  const [keywordList, setKeywordList] = useState<UseKeywordResponse[]>([]);
  const [selectedKeywordList, setSelectedKeywordList] = useState<
    UseKeywordResponse[]
  >([]);

  const [selectedIds, setSelectedIds] = useState<number[]>(
    formData.keywordIdArr ?? []
  );
  const { result, setResult } = useVoiceInputSession();

  const pathname = usePathname();

  const handleKeywordSelect = useCallback(
    (id: number, keyword: UseKeywordResponse) => {
      if (selectedIds.includes(id)) {
        setSelectedIds(selectedIds.filter((prevId) => prevId !== id));
        setSelectedKeywordList(
          selectedKeywordList.filter((prev) => prev.id !== id)
        );
      } else if (selectedIds.length >= 5) {
        toast({
          title: '최대 5개까지 선택할 수 있어요',
          description: '',
          variant: 'gray',
        });
      } else {
        setSelectedIds([...selectedIds, id]);
        setSelectedKeywordList([...selectedKeywordList, keyword]);
      }
    },
    [toast, selectedIds, setSelectedIds]
  );

  const handleBack = () => {
    onBack();
  };

  const handleNext = () => {
    onUpdate(selectedIds, selectedKeywordList);
  };

  useEffect(() => {
    const fetchKeywordList = async () => {
      const response = await getAllKeywords();
      setKeywordList(response.filter((keyword) => keyword.type !== 'MULTI'));
    };
    fetchKeywordList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (result) {
      const findSimilarKeywords = (input: string, threshold: number = 0.2) => {
        const inputWords = input.toLowerCase().split(' ');
        const similarKeywords: UseKeywordResponse[] = [];

        keywordList.forEach((keyword) => {
          const keywordWords = keyword.name.toLowerCase().split(' ');
          const keywordLength = keywordWords.length;

          for (let i = 0; i <= inputWords.length - keywordLength; i++) {
            const inputSubset = inputWords
              .slice(i, i + keywordLength)
              .join(' ');
            const distance = levenshtein(
              inputSubset,
              keyword.name.toLowerCase()
            );
            const similarity =
              1 - distance / Math.max(inputSubset.length, keyword.name.length);

            if (similarity >= threshold) {
              similarKeywords.push(keyword);
              break;
            }
          }
        });

        return similarKeywords;
      };

      const similarKeywords = findSimilarKeywords(result, 0.5);
      const newSelectedIds = similarKeywords.map((keyword) => keyword.id);

      setSelectedIds((prev) => {
        if (prev.length >= 5) {
          toast({
            title: '최대 5개까지 선택할 수 있어요',
            description: '',
            variant: 'gray',
          });
          return prev;
        }
        const uniqueIds = [...prev, ...newSelectedIds];
        return uniqueIds.slice(0, 5); // 최대 5개까지만 선택
      });
      setSelectedKeywordList((prev) => {
        const uniqueKeywords = [
          ...prev,
          ...similarKeywords.filter(
            (keyword) => !prev.map((k) => k.id).includes(keyword.id)
          ),
        ];
        return uniqueKeywords.slice(0, 5); // 최대 5개까지만 선택
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
      <div className='font-medium text-lightGray pl-5 py-[11px]'>
        최소 <span className='text-hanaPrimary'>2개</span>부터 최대{' '}
        <span className='text-hanaPrimary'>5개</span>까지 선택 가능해요
      </div>
      {/* 키워드 리스트 */}
      <div className='flex flex-col flex-grow overflow-y-scroll pt-[20px] px-5 pb-24 gap-2.5'>
        {keywordList.map((each) => (
          <MultiKeyword
            key={each.id}
            data={each}
            onClick={() => handleKeywordSelect(each.id, each)}
            isSelected={selectedIds.includes(each.id)}
          />
        ))}
      </div>
      <SpeechToText autoStart placeholder='조합할 키워드를 설정해주세요' />
    </div>
  );
}
