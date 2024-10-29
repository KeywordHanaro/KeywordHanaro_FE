'use client';

import Header from '@/components/atoms/Header';
import { MicRef } from '@/components/atoms/Mic';
import {
  type MyAccountItemProps,
  type MyOrOthersAccountItemProps,
} from '@/components/molecules/AccountListItem';
import KeywordCompletion from '@/components/templates/KeywordCompletion';
import KeywordInputButton from '@/components/templates/KeywordInputButton';
import SelectAccount from '@/components/templates/SelectAccount';
import HowMuch, {
  type WithAmountProps,
  type WithoutAmountProps,
} from '@/components/templates/createKeyword/transfer/HowMuch';
import InputToAccount from '@/components/templates/createKeyword/transfer/InputToAccount';
import SelectToAccount from '@/components/templates/createKeyword/transfer/SelectToAccount';
import { bankList } from '@/data/bank';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export type TransferForm =
  | {
      type: 'WithoutAmount';
      fromAccount: MyAccountItemProps;
      toAccount: MyOrOthersAccountItemProps;
      checkEverytime: true;
      keyword: string;
    }
  | {
      type: 'WithAmount';
      fromAccount: MyAccountItemProps;
      toAccount: MyOrOthersAccountItemProps;
      checkEverytime: false;
      amount: string;
      keyword: string;
    };

export default function KeywordCreateTransferPage() {
  // 1.내 계좌를 선택해주세요
  // 2. 어디로 돈을 보낼까요
  // (3).어떤 계좌로 보낼까요
  // 4. 얼마를 보낼까요
  // 5. 키워드 이름을 설정해주세요
  // 6. 키워드 설정이 완료되었어요

  const router = useRouter();
  const [formData, setFormData] = useState<TransferForm>({
    type: 'WithAmount',
    fromAccount: {
      type: 'MyAccount',
      accountName: '',
      accountNumber: '',
      bankId: 0,
    },
    toAccount: {
      type: 'OthersAccount',
      name: '',
      accountNumber: '',
      bankId: 0,
    },
    checkEverytime: false,
    amount: '',
    keyword: '',
  });

  const bankName = bankList.find(
    (bank) => bank.id === formData.toAccount.bankId
  )?.bankname;

  const [step, setStep] = useState(1);

  const nextStep = (step = 1) => setStep((prev) => prev + step);
  const prevStep = (step = 1) => setStep((prev) => prev - step);

  const handleOnBack = () => {
    if (step == 1) {
      router.back();
    } else if (step == 4) {
      prevStep(2);
    } else {
      prevStep();
    }
  };

  const updateFormData = (newData: Partial<TransferForm>) => {
    setFormData((prevData) => {
      let updatedData: TransferForm;

      if (
        newData.type === 'WithoutAmount' &&
        newData.checkEverytime &&
        prevData.type === 'WithAmount'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { amount, ...rest } = prevData;
        updatedData = { ...rest, ...newData } as TransferForm;
      } else {
        updatedData = { ...prevData, ...newData } as TransferForm;
      }

      return updatedData;
    });
  };

  const handleComplete = () => {
    router.push('/');
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className='flex flex-col w-full h-full'>
      <Header
        text='키워드 생성하기'
        onBack={handleOnBack}
        showActionButton={false}
      />
      <div className='h-full flex flex-col flex-grow overflow-hidden mt-[24px] px-[20px] pb-[34px]'>
        {/* step 1 내 계좌를 선택해주세요 */}
        {step === 1 && (
          <SelectAccount
            onUpdate={(fromAccount: MyAccountItemProps) =>
              updateFormData({ fromAccount })
            }
            onNext={nextStep}
          />
        )}
        {/* step 2 어디로 돈을 보낼까요 */}
        {step === 2 && (
          <SelectToAccount
            selectedAccountNumber={formData.fromAccount.accountNumber}
            onNext={nextStep}
            onUpdate={(toAccount: MyOrOthersAccountItemProps) =>
              updateFormData({ toAccount })
            }
          />
        )}
        {/* step (3)어떤 계좌로 보낼까요 */}
        {step === 3 && (
          <InputToAccount
            onNext={nextStep}
            onUpdate={(toAccount: MyOrOthersAccountItemProps) =>
              updateFormData({ toAccount })
            }
          />
        )}
        {/* step 4 얼마를 보낼까요 */}
        {step === 4 && (
          <HowMuch
            fromAccount={formData.fromAccount}
            toAccount={formData.toAccount}
            formData={formData}
            onNext={nextStep}
            onUpdate={(data: WithAmountProps | WithoutAmountProps) =>
              updateFormData(data)
            }
          />
        )}
        {/* step 5 키워드 이름을 설정해주세요 */}
        {step === 5 && (
          <KeywordInputButton
            title='키워드의 이름을 설정해주세요'
            placeHolder='키워드 이름을 작성해주세요'
            onUpdate={(keyword) => updateFormData({ keyword })}
            onNext={nextStep}
          />
        )}
        {/* step 6 키워드 설정이 완료되었어요 */}
        {step === 6 && (
          <KeywordCompletion onClick={handleComplete}>
            <div className=''>
              <div className='flex flex-col items-center justify-center gap-[11px]'>
                <div className='text-[18px]'>
                  <span className='text-hanaPrimary'>
                    {formData.keyword + ' '}
                  </span>
                  키워드를 호출하면
                </div>
                <div className='text-[18px]'>
                  내 {formData.fromAccount.accountName} 계좌에서
                </div>
                <div className='text-[24px]'>
                  {formData.toAccount.type === 'MyAccount' ? (
                    <div>
                      <span>내</span>
                      <span className='text-hanaPrimary'>
                        {' ' + formData.toAccount.accountName + ' '}
                      </span>
                      <span>계좌로</span>
                    </div>
                  ) : (
                    <div>
                      <span className='text-hanaPrimary font-semibold'>
                        {formData.toAccount.name}
                      </span>
                      <span>님 계좌로</span>
                    </div>
                  )}
                </div>
                <div className='text-placeholderGray text-[12px] -mt-1'>
                  {bankName} {formData.toAccount.accountNumber}
                </div>
                <div className='text-[18px] text-hanaPrimary font-semibold'>
                  {formData.type === 'WithAmount'
                    ? formData.amount + ' 원이 '
                    : '매번 지정한 금액만큼 '}
                  송금돼요
                </div>
              </div>
            </div>
          </KeywordCompletion>
        )}

        {/* 설정 완료 페이지 마이크 x */}
        {step !== 6 && <MicRef />}
      </div>
    </div>
  );
}
