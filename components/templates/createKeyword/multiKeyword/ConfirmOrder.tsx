import Keyword from '@/components/molecules/Keyword';
import { MultiKeywordForm } from '@/contexts/MultiKeywordContext';
import { keywordList } from '@/data/keyword';

type ConfirmOrderProps = {
  formData: MultiKeywordForm;
  onUpdate: () => void;
};

export default function ConfirmOrder({
  formData,
  onUpdate,
}: ConfirmOrderProps) {
  // TODO: 키워드 순서 변경
  const handleNext = () => {
    onUpdate();
  };

  return (
    <div>
      <div className='font-semibold text-[24px] pl-5 pt-6'>
        선택된 키워드에요 <br></br> 실행 순서를 설정해주세요
      </div>
      <div className='font-medium text-lightGray pl-5 pt-[11px]'>
        카드를 길게 누른 후 카드를 이동해주세요
      </div>
      {/* 키워드 리스트 */}
      <div className='flex flex-col flex-grow overflow-y-scroll pt-[27px] px-5 gap-2.5'>
        {formData.keywordIdArr.map((id) => {
          const data = keywordList.find((el) => el.id === id);
          if (!data) return null;
          return <Keyword key={id} data={data} />;
        })}
        <div className='font-medium text-lightGray pt-[12px] text-center'>
          조회 키워드는 순서와 상관 없이 가장 먼저 실행돼요
        </div>
      </div>
    </div>
  );
}
