'use client';

import KeywordCompletion from '@/components/templates/KeywordCompletion';
import { useTransferForm } from '@/contexts/TransferContext';
import { bankList } from '@/data/bank';
import { useRouter } from 'next/navigation';

export default function Step6() {
  const { formData } = useTransferForm();
  const router = useRouter();
  const bankName = bankList.find(
    (bank) => bank.id === formData.toAccount.bankId
  )?.bankname;

  const handleComplete = () => {
    router.push('/keyword');
  };

  return (
    <KeywordCompletion onClick={handleComplete}>
      <div className=''>
        <div className='flex flex-col items-center justify-center gap-[11px]'>
          <div className='text-[18px]'>
            <span className='text-hanaPrimary'>{formData.keyword + ' '}</span>
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
  );
}
