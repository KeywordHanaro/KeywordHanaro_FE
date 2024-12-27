'use client';

import SpeechToText from '@/components/SpeechToText';
import Header from '@/components/atoms/Header';
import AddNewKeyword from '@/components/molecules/AddNewKeyword';
import Keyword from '@/components/molecules/Keyword';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { useToast } from '@/hooks/use-toast';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { UseKeywordResponse } from '@/types/Keyword';
import { motion, Reorder } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ulVariants, liVariants } from '@/lib/motionVariable';
import { findSimilarKeywords } from '@/lib/utils';

export default function KeywordPage() {
  const router = useRouter();
  const { getAllKeywords, updateFavorite } = useKeywordApi();
  const onEdit = () => {
    router.push('/keyword/edit');
  };
  const { toast } = useToast();

  const [keywordList, setKeywordList] = useState<UseKeywordResponse[]>([]);

  const [favoriteItems, setFavoriteItems] = useState<number[]>([]);
  const [normalItems, setNormalItems] = useState<number[]>([]);

  const { result, resetResult } = useVoiceInputSession();

  const handleFavoriteChange = async (id: number, favorite: boolean) => {
    if (favorite && favoriteItems.length === 5) {
      toast({
        title: '즐겨찾기는 최대 5개까지 선택할 수 있어요',
        description: '',
        variant: 'gray',
      });
      return;
    }

    setKeywordList((prevKeywords) => {
      const updatedKeywords = prevKeywords.map((k) =>
        k.id === id ? { ...k, favorite } : k
      );

      if (favorite) {
        setFavoriteItems((prev) => [...prev.filter((fid) => fid !== id), id]);
        setNormalItems((prev) => prev.filter((nid) => nid !== id));
      } else {
        setFavoriteItems((prev) => prev.filter((fid) => fid !== id));
        setNormalItems((prev) => [...prev.filter((nid) => nid !== id), id]);
      }

      return updatedKeywords;
    });

    // favorite만 업데이트 가능한 api 구현시 구현 가능

    await updateFavorite({ id, favorite }).then((res) => {
      console.log(res);
    });
  };

  const handleFavoriteReorder = (newOrder: number[]) => {
    setFavoriteItems(newOrder);
  };

  const handleNormalReorder = (newOrder: number[]) => {
    setNormalItems(newOrder);
  };

  useEffect(() => {
    const fetchKeywordList = async () => {
      const response = await getAllKeywords();
      console.log(response);
      setKeywordList(response);
      setFavoriteItems(response.filter((k) => k.favorite).map((k) => k.id));
      setNormalItems(response.filter((k) => !k.favorite).map((k) => k.id));
    };
    fetchKeywordList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (result) {
      const similarKeywords = findSimilarKeywords(keywordList, result);
      if (similarKeywords.length > 0) {
        const keywordElement = document.querySelector(
          `[data-keyword-id="${similarKeywords[0].id}"]`
        );
        if (keywordElement) {
          (keywordElement as HTMLElement).click();
        }
      }
      resetResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className='flex flex-col h-full'>
      <Header
        text='나의 키워드'
        actionLabel='편집'
        onBack={() => router.push('/')}
        onAction={onEdit}
      />
      <motion.ul
        variants={ulVariants}
        initial='hidden'
        animate='visible'
        className='flex flex-col flex-grow overflow-y-scroll pt-[10px] px-5 pb-24 gap-2.5'
      >
        <span className='text-center text-subGray text-[14px]'>
          키워드 순서는 꾸욱 눌러서 변경할 수 있어요
        </span>

        {favoriteItems && (
          <Reorder.Group
            axis='y'
            values={favoriteItems}
            onReorder={handleFavoriteReorder}
            className='flex flex-col gap-2.5'
          >
            {favoriteItems.map((id, index) => {
              const data = keywordList.find((el) => el.id === id);
              console.log('data', data);
              if (!data) return null;
              return (
                <motion.li key={id} variants={liVariants} custom={index}>
                  <Reorder.Item
                    value={id}
                    drag='y'
                    as='div'
                    initial={{ opacity: 1 }}
                  >
                    <Keyword
                      data-keyword-id={id}
                      data={data}
                      onFavoriteChange={handleFavoriteChange}
                    />
                  </Reorder.Item>
                </motion.li>
              );
            })}
          </Reorder.Group>
        )}

        {/* 일반 키워드 리스트 */}
        {normalItems && (
          <Reorder.Group
            axis='y'
            values={normalItems}
            onReorder={handleNormalReorder}
            className='flex flex-col gap-2.5'
          >
            {normalItems.map((id, index) => {
              const data = keywordList.find((el) => el.id === id);
              if (!data) return null;
              return (
                <motion.li
                  key={id}
                  variants={liVariants}
                  custom={favoriteItems.length + index}
                >
                  <Reorder.Item
                    key={id}
                    value={id}
                    drag='y'
                    as='div'
                    initial={{ opacity: 1 }}
                  >
                    <Keyword
                      data-keyword-id={id}
                      data={data}
                      onFavoriteChange={handleFavoriteChange}
                    />
                  </Reorder.Item>
                </motion.li>
              );
            })}
          </Reorder.Group>
        )}
        {
          <motion.li variants={liVariants} custom={keywordList.length + 1}>
            {keywordList && <AddNewKeyword />}
          </motion.li>
        }
      </motion.ul>

      <SpeechToText placeholder='키워드를 선택해주세요.' />
    </div>
  );
}
