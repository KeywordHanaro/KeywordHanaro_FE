'use client';

import Header from '@/components/atoms/Header';
import { KeywordInputRef } from '@/components/atoms/Inputs';
import BankInfoItem from '@/components/molecules/BankInfoItem';
import SelectBranch from '@/components/templates/createKeyword/ticket/SelectBranch';
import { useTicket } from '@/contexts/TicketContext';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { TBranch } from '@/types/Bank';
import { TicketKeywordRequest } from '@/types/Keyword';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';

export default function EditTicketKeywordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id');
  const { getKeywordById, updateKeyword } = useKeywordApi();

  // const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { setSelectedBranch, setKeywordName, keywordName, selectedBranch } =
    useTicket();
  const [branch, setBranch] = useState<TBranch | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getKeywordById(parseInt(id))
        .then((res) => {
          if (res.type !== 'TICKET') return;
          setBranch(res.branch);
          setKeyword(res.name);
          setSelectedBranch(res.branch);
          setKeywordName(res.name);
        })
        .catch((error) => {
          console.error('거래 내역 가져오기 실패:', error);
        });
    }
  }, [id]);

  const handleSetBranch = (branch: TBranch) => {
    setSelectedBranch(branch);
  };
  const keywordNameRef = useRef<HTMLInputElement>(null);
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKeywordName(e.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setKeywordName, keyword]
  );

  const onComplete = useCallback(() => {
    const updatedFormData = {
      type: 'TICKET',
      desc: '번호표 > ' + selectedBranch.placeName,
      branch: selectedBranch,
      name: keywordName,
    } as TicketKeywordRequest;
    updateKeyword(Number(id), updatedFormData);
    router.back();
  }, [keywordName, selectedBranch, router]);

  const isBtnDisabled = useMemo(() => {
    const isDataChanged =
      selectedBranch?.id !== branch?.id || keywordName !== keyword;
    const isValid = !!selectedBranch?.id && (keywordName?.length ?? 0 > 0);

    return !(isDataChanged && isValid);
  }, [selectedBranch, keywordName, branch, keyword]);

  return (
    <>
      <Header
        text='키워드 수정하기'
        showActionButton={!isBtnDisabled}
        onAction={onComplete}
      />
      <div className='p-4 flex flex-col gap-6'>
        <div>
          <div className='flex flex-col'>
            <strong>키워드명</strong>
            <KeywordInputRef
              className='text-hanaPrimary w-full'
              placeHolder={keywordName || '키워드를 입력하세요'}
              onChange={handleInputChange}
              defaultValue={keywordName || ''}
              ref={keywordNameRef}
            />
          </div>
        </div>
        <div className='pb-20'>
          <strong>현재 영업점</strong>
          <div className='pb-6'>
            {!!selectedBranch && <BankInfoItem data={selectedBranch} />}
          </div>

          <SelectBranch handleSetBranch={handleSetBranch} autoStart={false} />
        </div>
      </div>
    </>
  );
}
