'use client';

import Header from '@/components/atoms/Header';
import { KeywordInputRef } from '@/components/atoms/Inputs';
import AddNewKeyword from '@/components/molecules/AddNewKeyword';
import Keyword from '@/components/molecules/Keyword';
import { KeywordDetail, KeywordDetailList, keywordList } from '@/data/keyword';
import { motion, Reorder } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ulVariants, liVariants } from '@/lib/motionVariable';

export default function EditMultiKeywordPage() {
  const router = useRouter();

  const [multiKeywordData, setMultiKeywordData] =
    useState<KeywordDetail | null>(null);
  const [items, setItems] = useState<number[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');

    if (id) {
      // KeywordDetailList에서 해당 id를 가진 multiKeyword 찾기
      const foundKeyword = KeywordDetailList.find(
        (keyword) =>
          keyword.id === Number(id) && keyword.type === 'multiKeyword'
      );

      if (
        foundKeyword &&
        'keywordList' in foundKeyword &&
        foundKeyword.keywordList
      ) {
        // multiKeyword의 keywordList를 items 상태에 저장
        setMultiKeywordData(foundKeyword);
        setItems(foundKeyword.keywordList.map((item) => item.id));
      }
    }

    // setMultiKeywordData(KeywordDetailList.filter((id) => ()))
    // setItems(multiKeywordData.map((keyword) => keyword.id));
  }, []);

  const onComplete = () => {
    router.push('/keyword');
  };

  const handleReorder = (newOrder: number[]) => {
    setItems(newOrder);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (idToDelete: number) => {
    setItems((prevItems) => prevItems.filter((item) => item !== idToDelete));

    setMultiKeywordData((prevData) => {
      if (prevData && 'keywordList' in prevData && prevData.keywordList) {
        return {
          ...prevData,
          keywordList: prevData.keywordList.filter(
            (item) => item.id !== idToDelete
          ),
        };
      }
      return prevData;
    });
  };

  return (
    <>
      <div className='flex flex-col h-full'>
        <Header
          text='멀티키워드 수정하기'
          actionLabel='완료'
          onBack={() => router.push('/keyword')}
          onAction={onComplete}
        />
        <div className='flex flex-col gap-[24px] p-[20px]'>
          <div className='flex flex-col'>
            <p className='font-semibold text-[24px]'>키워드의 이름을</p>
            <p className='font-semibold text-[24px]'>설정해주세요</p>
          </div>
          <KeywordInputRef
            className='text-hanaPrimary w-full '
            placeHolder='키워드 이름을 작성해주세요'
            ref={inputRef}
            value={multiKeywordData?.title}
          />
        </div>

        <motion.ul
          variants={ulVariants}
          initial='hidden'
          animate='visible'
          className='flex flex-col flex-grow overflow-y-scroll pt-[10px] px-5 pb-24 gap-2.5'
        >
          <Reorder.Group
            axis='y'
            values={items}
            onReorder={handleReorder}
            className='flex flex-col gap-2.5'
          >
            {items.map((id, index) => {
              const data = keywordList.find((el) => el.id === id);
              if (!data) return null;
              return (
                <motion.li key={id} variants={liVariants} custom={index}>
                  <Reorder.Item key={id} value={id} drag='y'>
                    <Keyword
                      data={data}
                      canDelete={true}
                      onDelete={handleDelete}
                    ></Keyword>
                  </Reorder.Item>
                </motion.li>
              );
            })}
          </Reorder.Group>

          <motion.li variants={liVariants} custom={keywordList.length}>
            <AddNewKeyword text='새로운 키워드 추가하기' />
          </motion.li>
          <span className='text-center text-subGray text-[14px]'>
            키워드 순서는 꾸욱 눌러서 변경할 수 있어요
          </span>
        </motion.ul>
      </div>
    </>
  );
}
