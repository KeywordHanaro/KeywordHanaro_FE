'use client';

import Header from '@/components/atoms/Header';
import SetTransferAmount from '@/components/templates/useKeyword/transfer/SetTransferAmount';
import TransferComplete from '@/components/templates/useKeyword/transfer/TransferComplete';
import { TransferProps, UseKeywordTransfer } from '@/data/transfer';
// import Image from 'next/image';
import { useRef, useState } from 'react';

type TransferData = {
  transferAmount: string;
} & TransferProps;

export default function TransferPage() {
  // api call 한번 돌아야한다. 그런데 지금은 데이터가 없다
  // 그러면 지금은 일단 더미로 놔두고, 나중에 백엔드가 만들어지면

  // useEffect(() => {
  //   api call을 한다
  // }, []);
  const initialData = UseKeywordTransfer[0];
  const [formData, setFormData] = useState<TransferData>({
    ...initialData,
    transferAmount: '',
  });

  const [step, setStep] = useState(1);

  const amountRef = useRef<HTMLInputElement>(null);

  const onNext = () => {
    setFormData((prev) =>
      prev.type === 'WithoutAmount'
        ? {
            ...prev,
            transferAmount: amountRef.current?.value || '',
          }
        : {
            ...prev,
            transferAmount: prev.amount?.toString() || '',
          }
    );
    setStep((prev) => prev + 1);
    // 실제 송금
    // amountRef.current.value를 formData의 amount에 저장시켜줘
  };

  // const inputKeyword = '서아 저금통'; //[STT Input]

  const handleBack = () => {};
  const validAmount = (() => {
    if (amountRef.current) {
      console.log(amountRef.current.value);
      return amountRef.current.value.length > 0;
    }
    console.log('no');
  })();

  // console.log('amountRef.current.value', amountRef?.current?.value);

  // 검색한 키워드가 없을 경우
  // if (!transferData) {
  //   return (
  //     <div>
  //       <Header
  //         text={headerText}
  //         showBackButton={true}
  //         onBack={handleBack}
  //         showActionButton={false}
  //       />
  //       <div className='flex-col flex justify-center'>
  //         <Image
  //           src={'/images/alarts/noData.gif'}
  //           alt=''
  //           width={300}
  //           height={300}
  //           className='mx-auto'
  //         />
  //         <p className='text-center font-bold text-[20px]'>
  //           해당 키워드로 조회된 내역이 없어요!
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }
  // const isValid = validAmount();
  return (
    <div className='w-full h-full relative'>
      <Header
        text='키워드 송금'
        showBackButton={true}
        onBack={handleBack}
        showActionButton={initialData.type === 'WithoutAmount'}
        actionLabel='다음'
        onAction={() => (validAmount ? () => onNext() : undefined)}
        //onAction={validAmount ? () => alert('true') : () => alert('false')}
      />
      {step === 1 && <SetTransferAmount data={initialData} ref={amountRef} />}
      {step === 2 && (
        <TransferComplete
          amount={formData?.transferAmount}
          fromAccount={formData?.fromAccount}
          toAccount={formData?.toAccount}
        />
      )}
    </div>
  );
}
