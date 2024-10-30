'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { KeywordInputRef } from '@/components/atoms/Inputs';
import SelectMyAccount from '@/components/molecules/SelectMyAccount';
import { MyAccount } from '@/data/account';
import { InquiryKeyword, KeywordDetailList } from '@/data/keyword';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';

export default function EditInquiryPage() {
  const router = useRouter();
  //   const searchParams = useSearchParams();
  //   const id = searchParams.get('id');
  const keyword = KeywordDetailList[3] as InquiryKeyword;

  const [keywordTitle, setKeywordTitle] = useState(keyword.title);
  const [searchKeyword, setSearchKeyword] = useState(keyword.searchKeyword);
  const [myAccount, setMyAccount] = useState<MyAccount | undefined>(
    keyword.accountFrom as MyAccount
  );

  const keywordTitleRef = useRef<HTMLInputElement>(null);
  const searchKeywordRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeywordTitle(e.target.value);
  }, []);

  const handleSearchKeyword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(e.target.value);
    },
    []
  );

  const onComplete = useCallback(() => {
    if (myAccount && keyword) {
      const updatedFormData = {
        id: keyword.id,
        title: keywordTitle,
        accountForm: myAccount,
        searchKeyword: searchKeyword,
      };
      console.log('🚀 ~ onComplete ~ updatedFormData:', updatedFormData);
      router.back();
    }
  }, [keywordTitle, myAccount, searchKeyword, keyword]);

  const isButtonDisabled = useMemo(() => {
    const isDataChanged =
      keywordTitle !== keyword.title ||
      myAccount !== keyword.accountFrom ||
      searchKeyword !== keyword.searchKeyword;

    return !isDataChanged;
  }, [keywordTitle, myAccount, searchKeyword]);

  return (
    <div className='flex flex-col h-full'>
      <Header text='키워드 수정하기' showActionButton={false} />
      <div className='flex flex-col justify-between gap-6 p-[20px] h-full'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col'>
            <strong>키워드명</strong>
            <KeywordInputRef
              className='text-hanaPrimary w-full'
              placeHolder={keyword.title}
              onChange={handleInputChange}
              defaultValue={keyword.title}
              ref={keywordTitleRef}
            />
          </div>

          <div className='flex flex-col'>
            <strong>조회할 계좌</strong>
            <SelectMyAccount
              selected={myAccount?.type === 'MyAccount' ? myAccount : undefined}
              onSelect={setMyAccount}
            />
          </div>

          <div className='flex flex-col'>
            <strong>조회 내용</strong>
            <KeywordInputRef
              className='text-hanaPrimary w-full'
              placeHolder={keyword.searchKeyword}
              onChange={handleSearchKeyword}
              defaultValue={keyword.searchKeyword}
              ref={searchKeywordRef}
            />
          </div>

          <Button
            onClick={onComplete}
            className='w-full'
            isDisabled={isButtonDisabled}
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  );
}
