import Keyword from '@/components/molecules/Keyword';
import { MultiKeywordForm } from '@/contexts/MultiKeywordContext';
import { keywordList } from '@/data/keyword';
import { Reorder } from 'motion/react';
import { useState } from 'react';

interface ConfirmOrderProps {
  formData: MultiKeywordForm;
  onUpdate: (newKeywordIdArr: number[]) => void;
}

export default function ConfirmOrder({
  formData,
  onUpdate,
}: ConfirmOrderProps) {
  const [items, setItems] = useState<number[]>(formData.keywordIdArr);
  const handleReorder = (newOrder: number[]) => {
    setItems(newOrder);
    onUpdate(newOrder);
  };

  return (
    <div>
      <div className='font-semibold text-[24px] pl-5 pt-6'>
        선택된 키워드에요 <br></br> 실행 순서를 설정해주세요
      </div>
      <div className='font-medium text-lightGray pl-5 pt-[11px]'>
        카드를 길게 누른 후 카드를 이동해주세요
      </div>
      <div className='flex flex-col flex-grow overflow-y-scroll pt-[27px] px-5 gap-2.5'>
        <Reorder.Group
          axis='y'
          values={items}
          onReorder={handleReorder}
          className='flex flex-col gap-2.5'
        >
          {items.map((id) => {
            const data = formData.keywordList.find((el) => el.id === id);
            if (!data) return null;
            return (
              <Reorder.Item key={id} value={id} drag='y'>
                <Keyword data={data} />
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
        <div className='font-medium text-lightGray pt-[12px] text-center'>
          조회 키워드는 순서와 상관 없이 가장 먼저 실행돼요
        </div>
      </div>
    </div>
  );
}
