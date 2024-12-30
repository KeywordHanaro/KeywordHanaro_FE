'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { KeywordInputRef } from '@/components/atoms/Inputs';
import SelectMyAccount from '@/components/molecules/SelectMyAccount';
// import { InquiryKeyword, KeywordDetailList } from '@/data/keyword';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { MyAccount } from '@/types/Account';
import { InquiryUsageResponse } from '@/types/Keyword';
// import { useRouter, useSearchParams } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Suspense } from 'react';

export default function EditInquiryPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id');
  // const keyword = KeywordDetailList.find(
  //   (item) => item.id === Number(id)
  // ) as InquiryKeyword;

  const { getKeywordById, updateKeyword } = useKeywordApi();

  const [keyword, setKeyword] = useState<InquiryUsageResponse>();

  useEffect(() => {
    if (id) {
      getKeywordById(parseInt(id))
        .then((res) => {
          if (res.type !== 'INQUIRY') return;
          setKeyword(res);
          setKeywordTitle(res.name);
          setSearchKeyword(res.inquiryWord);
          setMyAccount({
            type: 'MyAccount',
            accountName: res.account.name,
            bankId: res.account.bank.id,
            accountId: res.account.id,
            accountNumber: res.account.accountNumber,
          });
        })
        .catch((error) => {
          console.error('거래 내역 가져오기 실패:', error);
        });
    }
  }, [id]);

  const [keywordTitle, setKeywordTitle] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [myAccount, setMyAccount] = useState<MyAccount>();

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

  const onComplete = useCallback(async () => {
    if (keyword) {
      if (!myAccount) return;

      await updateKeyword(keyword.id, {
        type: 'INQUIRY',
        name: keywordTitle,
        account: { id: myAccount.accountId },
        inquiryWord: searchKeyword,
        desc: myAccount?.accountName + '에서 조회 > ' + searchKeyword,
      });

      router.push('/keyword');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordTitle, myAccount, searchKeyword, keyword]);

  const isButtonDisabled = useMemo(() => {
    const isDataChanged =
      keywordTitle !== keyword?.name ||
      myAccount?.accountId !== keyword?.account.id ||
      myAccount?.accountName !== keyword?.account.name ||
      myAccount?.bankId !== keyword?.account.bank.id ||
      myAccount?.accountNumber !== keyword?.account.accountNumber ||
      searchKeyword !== keyword?.inquiryWord;

    return !keywordTitle || !searchKeyword || !isDataChanged;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordTitle, myAccount, searchKeyword]);

  return (
    <Suspense>
      <div className='flex flex-col h-full'>
        <Header text='키워드 수정하기' showActionButton={false} />
        <div className='flex flex-col justify-between gap-6 p-[20px] h-full'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col'>
              <strong>키워드명</strong>
              <KeywordInputRef
                className='text-hanaPrimary w-full'
                placeHolder={keyword?.name}
                onChange={handleInputChange}
                defaultValue={keyword?.name}
                ref={keywordTitleRef}
              />
            </div>

            <div className='flex flex-col'>
              <strong>내 계좌</strong>
              {/* <SelectMyAccount
                selected={myAccount}
                onSelect={setMyAccount}
              /> */}
              {myAccount && (
                <SelectMyAccount selected={myAccount} onSelect={setMyAccount} />
              )}
            </div>

            <div className='flex flex-col'>
              <strong>조회 내용</strong>
              <KeywordInputRef
                className='text-hanaPrimary w-full'
                placeHolder={keyword?.inquiryWord}
                onChange={handleSearchKeyword}
                defaultValue={keyword?.inquiryWord}
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
    </Suspense>
  );
}
