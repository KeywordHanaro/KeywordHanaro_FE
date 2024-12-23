'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { KeywordInputRef } from '@/components/atoms/Inputs';
import BankInfoItem from '@/components/molecules/BankInfoItem';
import SelectBranch from '@/components/templates/createKeyword/ticket/SelectBranch';
import { useTicket } from '@/contexts/TicketContext';
import { ticketKeyword } from '@/data/ticket';
import { TBranch } from '@/types/Branch';
import { useRouter } from 'next/navigation';
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
  // const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { setSelectedBranch, setKeywordName, keywordName, selectedBranch } =
    useTicket();
  const [branch, setBranch] = useState<TBranch | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);
  useEffect(() => {
    setBranch(ticketKeyword[0].branch);
    setKeyword(ticketKeyword[0].keyword);
    setSelectedBranch(ticketKeyword[0].branch);
    setKeywordName(ticketKeyword[0].keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetBranch = (branch: TBranch) => {
    setSelectedBranch(branch);
    // router.push('/keyword/create/ticket/step3');
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
      branch: selectedBranch,
      keywordName: keywordName,
    };
    console.log('Sending data to server:', updatedFormData);
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
      <Header text='키워드 수정하기' showActionButton={false} />
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
        <div>
          <strong>현재 영업점</strong>
          <div className='pb-6'>
            {!!selectedBranch && <BankInfoItem data={selectedBranch} />}
          </div>

          <SelectBranch handleSetBranch={handleSetBranch} />
        </div>
        <Button
          onClick={onComplete}
          className='w-full'
          isDisabled={isBtnDisabled}
        >
          완료
        </Button>
      </div>
    </>
  );
}
