'use client';

import Header from '@/components/atoms/Header';
import { MicRef } from '@/components/atoms/Mic';
import { MyAccountItemProps } from '@/components/molecules/AccountListItem';
import KeywordCompletion from '@/components/templates/KeywordCompletion';
import KeywordInputButton from '@/components/templates/KeywordInputButton';
import SelectAccount from '@/components/templates/SelectAccount';
import { useEffect, useState } from 'react';

// export type MyAccount = {
//   accountName: string;
//   bankId: number;
//   accountNumber: string;
// };

export type DataProps = {
  account: MyAccountItemProps;
  inquiry: string;
  keywordName: string;
};

export default function KeywordCreateInquiryPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<DataProps>({
    account: { accountName: '', bankId: 0, accountNumber: '' },
    inquiry: '',
    keywordName: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (newData: Partial<DataProps>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handle = () => {
    console.log('xxx');
  };

  /* 
  1. 계좌 선택
  2. 조회 내용 입력
  3. 키워드 이름 설정
  4. 완료 
  */

  return (
    <div className='h-screen relative'>
      <Header text='키워드 생성하기' showActionButton={false} />

      <div className='px-[20px] mt-[24px]'>
        {/* 1. 계좌 선택 */}
        {step === 1 && (
          <SelectAccount
            // account={formData.account}
            onUpdate={(account: MyAccountItemProps) =>
              updateFormData({ account })
            }
            onNext={nextStep}
          />
        )}

        {/* 2. 조회 내용 입력 */}
        {step === 2 && (
          <KeywordInputButton
            title='어떤 내용을 조회할까요?'
            placeHolder='조회할 내용을 작성해주세요'
            onUpdate={(inquiry) => updateFormData({ inquiry })}
            onNext={nextStep}
          >
            <h1>거래 내역에 적히는 내용으로만 조회돼요</h1>
            <h1>
              ex) 9월 급여, 10월 급여와 같이 매달 달라진다면 <br />
              공통 단어인 “급여”를 작성해주세요
            </h1>
          </KeywordInputButton>
        )}

        {/* 3. 키워드 이름 설정 */}
        {step === 3 && (
          <KeywordInputButton
            title='키워드 이름을 설정해주세요'
            placeHolder='키워드 이름을 작성해주세요'
            onUpdate={(keywordName) => updateFormData({ keywordName })}
            onNext={nextStep}
          />
        )}

        {/* 4. 설정 완료 */}
        {step === 4 && (
          <KeywordCompletion onClick={handle}>
            <div className='flex flex-col items-center justify-center gap-2'>
              <p className='text-[18px]'>
                <span className='text-hanaPrimary'>{formData.keywordName}</span>{' '}
                키워드를 호출하면
              </p>
              <p className='text-[18px]'>
                {formData.account.accountName} 계좌에서
              </p>
              <p className='font-semibold text-[24px]'>
                <span className='text-hanaPrimary'>{formData.inquiry}</span>가
                조회돼요
              </p>
            </div>
          </KeywordCompletion>
        )}
      </div>
      <MicRef />
    </div>
  );
}
