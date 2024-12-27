'use client';

import Header from '@/components/atoms/Header';
import AddNewKeyword from '@/components/molecules/AddNewKeyword';
import EditKeyword from '@/components/molecules/EditKeyword';
// import { KeywordDetailList } from '@/data/keyword';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { UseKeywordResponse } from '@/types/Keyword';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// import { useEffect } from 'react';

export default function EditKeywordPage() {
  const router = useRouter();
  const { getAllKeywords, deleteKeyword } = useKeywordApi();
  const onComplete = () => {
    router.push('/keyword');
  };
  const [keywordList, setKeywordList] = useState<UseKeywordResponse[]>([]);

  const onEditKeyword = (id: number, type: string) => {
    const route = type.toLowerCase().replace('amount', '');
    if (type === 'SETTLEMENT' || type === 'DUES') {
      router.push(`/keyword/edit/settlement/step1?id=${id}`);
    } else if (type === 'MULTI')
      router.push(`/keyword/edit/multikeyword?id=${id}`);
    else router.push(`/keyword/edit/${route}?id=${id}`);
  };
  const onDeleteKeyword = async (id: number) => {
    const confirmed = window.confirm(`정말로 키워드를 삭제하시겠습니까?`);
    if (!confirmed) return;

    await deleteKeyword(id);
    setKeywordList((prevList) =>
      prevList.filter((keyword) => keyword.id !== id)
    );
    alert('키워드를 삭제했습니다.');
  };

  useEffect(() => {
    const fetchKeywordList = async () => {
      const response = await getAllKeywords();
      setKeywordList(response);
    };
    fetchKeywordList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <Header
        text='나의 키워드'
        actionLabel='완료'
        onBack={() => router.push('/keyword')}
        onAction={onComplete}
      ></Header>
      <div className='flex flex-col flex-grow  overflow-y-scroll pt-[10px] px-5 pb-24 gap-2.5'>
        {keywordList.map((each) => (
          <EditKeyword
            key={each.id}
            data={each}
            onEdit={() => onEditKeyword(each.id, each.type)}
            onDelete={onDeleteKeyword}
          ></EditKeyword>
        ))}
        <AddNewKeyword></AddNewKeyword>
      </div>
    </div>
  );
}
