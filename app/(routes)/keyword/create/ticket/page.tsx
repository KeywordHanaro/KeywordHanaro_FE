'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { MicRef } from '@/components/atoms/Mic';
import KeywordCompletion from '@/components/templates/KeywordCompletion';
import KeywordInputButton from '@/components/templates/KeywordInputButton';
import LocationAgreement from '@/components/templates/createKeyword/ticket/LocationAgreement';
import SelectBranch from '@/components/templates/createKeyword/ticket/SelectBranch';
import { Branch } from '@/data/bank';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function KeywordCreateTicketPage() {
  const router = useRouter();
  const [isCheck, setIsCheck] = useState(false);
  const [isTerms, setIsTerms] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [keywordName, setKeywordName] = useState<string | null>(null);

  // 1 : 위치 기반 서비스 동의
  // 2 : 번호표 발급 영업점 선택
  // 3 : 키워드 이름 선택
  // 4 : 완료
  const [step, setStep] = useState(1);

  const handleOnBack = () => {
    if (step === 1) {
      router.back();
    } else {
      handleStepDown();
    }
  };

  const handelTerms = () => {
    setIsTerms((pre) => !pre);
  };

  const handelStep = () => {
    setStep((pre) => pre + 1);
  };

  const handleStepDown = () => {
    if (step > 1) setStep((pre) => pre - 1);
  };

  const handleSetBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    handelStep();
  };

  // useEffect(() => {
  //   if (selectedBranch !== null) alert(selectedBranch.branchName + ' 선택완료');
  // }, [selectedBranch]);

  // useEffect(() => {
  //   console.log(keywordName);
  // }, [keywordName]);

  const handleComplete = () => {
    console.log('최종 완료', step, selectedBranch, keywordName);
    router.push('/');
  };

  return (
    <div className='w-full h-full relative'>
      <Header
        text='키워드 생성하기'
        onBack={handleOnBack}
        showActionButton={false}
      />
      <div className='w-full flex flex-col mt-[24px] px-[20px] pb-[34px]'>
        {/* step 1 위치 기반 서비스 동의 */}
        {step === 1 && (
          <LocationAgreement
            isCheck={isCheck}
            isTerms={isTerms}
            handelTerms={handelTerms}
            setIsCheck={setIsCheck}
          />
        )}

        {/* step 2 번호표 발급 영업점 선택 */}
        {step === 2 && <SelectBranch handleSetBranch={handleSetBranch} />}

        {/* step 3 키워드 이름 선택 */}
        {step === 3 && (
          <KeywordInputButton
            title='키워드의 이름을 설정해주세요'
            placeHolder='키워드 이름을 작성해주세요 (예: 줄서줘)'
            onUpdate={setKeywordName}
            onNext={handelStep}
          />
        )}

        {/* step 4 완료 */}
        {step === 4 && (
          <KeywordCompletion onClick={handleComplete}>
            <div className='flex flex-col items-center justify-center'>
              <div className='flex font-medium text-[18px] gap-[2px]'>
                <p className='text-[#069894]'>{keywordName}</p>
                <p>키워드로</p>
              </div>
              <div className='flex font-semibold text-[24px] gap-[2px] mt-[11px]'>
                <p className='text-[#069894]'>{selectedBranch?.branchName}</p>
                <p>에서</p>
              </div>
              <p className='font-semibold text-[24px]'>
                모바일 번호표가 발급돼요
              </p>
            </div>
          </KeywordCompletion>
        )}

        {/* 버튼 step 1,3,4 */}
        {step === 1 && (
          <Button
            isDisabled={isCheck || isTerms ? false : true}
            className='w-full text-[15px] text-semibold text-[#FFF] mt-[24px]'
            onClick={() => {
              handelStep();
              if (isTerms || isCheck) {
                setIsTerms(false);
                setIsCheck(false);
              }
            }}
          >
            {isTerms ? <>동의</> : <>다음</>}
          </Button>
        )}

        {step === 3 && <MicRef />}
      </div>
    </div>
  );
}
