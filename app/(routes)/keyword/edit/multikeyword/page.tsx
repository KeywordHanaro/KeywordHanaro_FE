'use client';

import Header from '@/components/atoms/Header';
import { KeywordInputRef } from '@/components/atoms/Inputs';
import AddNewKeyword from '@/components/molecules/AddNewKeyword';
import Keyword from '@/components/molecules/Keyword';
import MultiKeyword from '@/components/molecules/MultiKeyword';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useToast } from '@/hooks/use-toast';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { MultiUsageResponse, UseKeywordResponse } from '@/types/Keyword';
import { motion, Reorder } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ulVariants, liVariants } from '@/lib/motionVariable';
import { cn } from '@/lib/utils';

export default function EditMultiKeywordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { getAllKeywords, getKeywordById } = useKeywordApi();
  const id = searchParams.get('id');

  const [multiKeywordData, setMultiKeywordData] =
    useState<MultiUsageResponse>();
  const [currentKeyword, setCurrentKeyword] = useState<MultiUsageResponse>();
  const [showActionButton, setShowActionButton] = useState(false);

  const [allKeywords, setAllKeywords] = useState<UseKeywordResponse[]>([]);
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    if (id) {
      getKeywordById(Number(id))
        .then((res) => {
          console.log(res);
          if (res.type !== 'MULTI') return;
          setMultiKeywordData(res);
          setCurrentKeyword(res);
          setItems(res.multiKeyword.map((item) => item.id));
        })
        .catch((error) => {
          console.error('키워드 가져오기 실패:', error);
        });
      getAllKeywords().then((res) => {
        setAllKeywords(res);
      });
    }
  }, []);

  // seqOrder 업데이트 후 이동
  const onComplete = () => {
    if (inputRef.current && multiKeywordData) {
      console.log({
        name: inputRef.current.value || multiKeywordData.name,
        type: 'MULTI',
        desc: multiKeywordData.desc,
        multiKeywordIds: items,
      });
      // updateKeyword(Number(id), {
      //   name: inputRef.current.value || multiKeywordData.name,
      //   type: 'MULTI',
      //   desc: multiKeywordData.desc,
      //   multiKeywordIds: items,
      // });
    }
    router.push('/keyword');
  };

  const handleReorder = (newOrder: number[]) => {
    setItems(newOrder);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (idToDelete: number) => {
    setItems((prevItems) => prevItems.filter((item) => item !== idToDelete));

    setCurrentKeyword((prevData) => {
      if (prevData && 'keywordList' in prevData && prevData.keywordList) {
        return {
          ...prevData,
          keywordList: prevData.multiKeyword.filter(
            (item) => item.id !== idToDelete
          ),
        };
      }
      return prevData;
    });
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleShowModal = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseModal = () => {
    console.log('모달 닫기');
    setIsDrawerOpen(false);
  };

  const handleKeywordSelect = useCallback(
    (id: number) => {
      if (items.includes(id)) {
        setItems(items.filter((prevId) => prevId !== id));
      } else if (items.length >= 5) {
        toast({
          title: '최대 5개까지 선택할 수 있어요',
          description: '',
          variant: 'gray',
        });
      } else {
        setItems([...items, id]);
      }
    },
    [toast, items, setItems]
  );

  useEffect(() => {
    if (multiKeywordData && currentKeyword) {
      const hasChanges =
        multiKeywordData.multiKeyword.map((item) => item.id) !== items ||
        multiKeywordData.name !== inputRef.current?.value;
      setShowActionButton(hasChanges);
    }
  }, [multiKeywordData, currentKeyword]);

  return (
    <>
      <div className='flex flex-col h-full'>
        <Header
          text='멀티키워드 수정하기'
          actionLabel='완료'
          showActionButton={showActionButton}
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
            value={multiKeywordData?.name}
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
              const data = multiKeywordData?.multiKeyword.find(
                (el) => el.id === id
              );
              if (!data) return null;
              return (
                <motion.li key={id} variants={liVariants} custom={index}>
                  <Reorder.Item key={id} value={id} drag='y'>
                    <Keyword
                      data={data.keyword}
                      canDelete={true}
                      onDelete={handleDelete}
                    ></Keyword>
                  </Reorder.Item>
                </motion.li>
              );
            })}
          </Reorder.Group>
          {multiKeywordData && multiKeywordData.multiKeyword.length < 5 && (
            <motion.li
              variants={liVariants}
              custom={multiKeywordData.multiKeyword.length}
            >
              <div onClick={handleShowModal}>
                <AddNewKeyword text='새로운 키워드 추가하기' isCreate={false} />
              </div>
            </motion.li>
          )}
          <span className='text-center text-subGray text-[14px]'>
            키워드 순서는 꾸욱 눌러서 변경할 수 있어요
          </span>
        </motion.ul>
      </div>

      <Drawer open={isDrawerOpen} onClose={handleCloseModal}>
        <DrawerTrigger className='my-2 w-full rounded-lg after:w-full after:border flex flex-col'></DrawerTrigger>
        <DrawerContent className='min-h-[300px] max-h-[calc(100vh-200px)] overflow-hidden transition-all duration-500 ease-out'>
          <DrawerHeader className='text-left'>
            <DrawerTitle>추가할 키워드를 선택해주세요</DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>
          <DrawerFooter
            className={cn(
              ' overflow-y-auto transition-all duration-500 ease-out',
              'h-screen'
            )}
          >
            <div className='w-full flex flex-col gap-2.5'>
              {allKeywords &&
                multiKeywordData &&
                allKeywords
                  .filter((keyword) => {
                    multiKeywordData.multiKeyword.forEach((item) => {
                      if (item.id === keyword.id) {
                        return false;
                      }
                    });
                    return keyword.id !== Number(id);
                  })
                  .map((keyword) => (
                    <MultiKeyword
                      key={keyword.id}
                      data={keyword}
                      onClick={() => handleKeywordSelect(keyword.id)}
                      isSelected={items.includes(keyword.id)}
                    />
                  ))}
              <DrawerClose className='bg-hanaPrimary text-white text-[16px] font-semibold p-3 flex justify-center items-center rounded-lg'>
                완료
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
