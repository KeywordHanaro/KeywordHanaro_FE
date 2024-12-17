'use client';

import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { getColorByType, getNameByType, KeywordDetail } from '@/data/keyword';
import { Member } from '@/data/member';
import { convertKorToNum } from 'korean-number-converter';
import { useState, useRef, useEffect } from 'react';
import SpeechToText from '../SpeechToText';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import ColorChip from '../atoms/ColorChips';
import { MoneyInputRef } from '../atoms/Inputs';
import { Modal } from '../atoms/Modal';
import MemberSelector from '../organisms/MemberSelector';

type KeywordWithInputsProps = {
  keyword: KeywordDetail;
  onInputChange: (id: number, value: number) => void;
  onMemberListChange: (id: number, memberList: Member[]) => void;
  onTicketServiceChange: (
    id: number,
    serviceId: number,
    serviceName: string
  ) => void;
};

const categories = [
  {
    id: 1,
    name: '예금',
    description: '(송금, 입금, 출금, 예적금 등)',
  },
  {
    id: 2,
    name: '개인 대출',
    description: '',
    path: '/ticket/detail?task=개인 대출',
    src: '/images/icons/personalLoan.png',
  },
  {
    id: 3,
    name: '기업 대출',
    description: '',
    path: '/ticket/detail?task=기업 대출',
    src: '/images/icons/corporateLoan.png',
  },
];

const KeywordWithInputs = ({
  keyword,
  onInputChange,
  onMemberListChange,
  onTicketServiceChange,
}: KeywordWithInputsProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentService, setCurrentService] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { result } = useVoiceInputSession();

  const chipColor = getColorByType(keyword.type);
  const chipName = getNameByType(keyword.type);

  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('result', result);
    if (result && isFocused && amountRef.current) {
      const cleanedResult = result.replace(/[\s-]/g, '');
      const amountVal = convertKorToNum(cleanedResult);
      if (amountVal) {
        amountRef.current.value = amountVal.toLocaleString();
        onInputChange(keyword.id, Number(amountVal));
        setIsFocused(false); 
      }
    }
  }, [result]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(keyword.id, Number(e.target.value));
  };

  const handleFocus = () => {
    console.log('focus');
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Check if the related target is the microphone button
    if (e.relatedTarget?.closest('.microphone-button')) {
      // Don't blur if clicking the microphone
      e.preventDefault();
      // Restore focus to the input
      amountRef.current?.focus();
      return;
    }
    setIsFocused(false);
  };

  const handleMemberListChange = (newMemberList: Member[]) => {
    onMemberListChange(keyword.id, newMemberList);
  };

  const handleTicketService = (serviceId: number, serviceName: string) => {
    setCurrentService(serviceName);
    onTicketServiceChange(keyword.id, serviceId, serviceName);
    setOpenModal(!openModal);
  };

  const selectService = () => {
    setOpenModal(!openModal);
  };

  return (
    <Card className='flex flex-row justify-between items-center rounded-[12px]'>
      <div className='flex flex-col gap-[10px] w-full'>
        <div className='flex gap-2 items-center'>
          <span className='text-fontBlack text-[16px] font-semibold'>
            {keyword.title}
          </span>
          <ColorChip color={chipColor}>{chipName}</ColorChip>
        </div>

        {(keyword.type === 'transfer' || keyword.type === 'settlement') && (
          <MoneyInputRef
            ref={amountRef}
            onChange={handleAmountChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeHolder={
              keyword.type === 'transfer'
                ? '얼마를 송금할까요?'
                : '얼마를 요청할까요?'
            }
          />
        )}

        {(keyword.type === 'settlement' ||
          keyword.type === 'settlementAmount') && (
          <MemberSelector
            initialMembers={keyword.memberList || []}
            onUpdate={handleMemberListChange}
          />
        )}
      </div>
      {keyword.type === 'ticket' && (
        <div
          className={`text-end w-full text-[11px] ${
            currentService
              ? 'text-hanaPrimary font-semibold text-[14px]'
              : 'text-placeholderGray'
          }`}
          onClick={selectService}
        >
          {currentService || '클릭해서 업무를 선택해주세요'}
          {currentService && ' 업무'}
        </div>
      )}

      <Modal
        open={openModal}
        title='미리 서류를 작성해주세요'
        onChange={selectService}
      >
        {categories.map((item, index) => (
          <div key={index}>
            <Button
              className='w-full'
              onClick={() => handleTicketService(item.id, item.name)}
            >
              {item.name}
            </Button>
          </div>
        ))}
      </Modal>
      {isFocused && <SpeechToText autoStart />}
    </Card>
  );
};

export default KeywordWithInputs;
