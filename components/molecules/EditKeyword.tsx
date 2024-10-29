'use client';

import { getColorByType, getNameByType, KeywordDetail } from '@/data/keyword';
import { DelButton, EditButton } from '../atoms/Button';
import { Card } from '../atoms/Card';
import ColorChip from '../atoms/ColorChips';

type EditKeywordProps = {
  data: KeywordDetail;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const EditKeyword = ({ data, onEdit, onDelete }: EditKeywordProps) => {
  const { id, type, title } = data;
  const chipColor = getColorByType(type);
  const chipName = getNameByType(type);

  const renderDetails = () => {
    switch (type) {
      case 'transfer':
        return (
          <>
            <span className='font-semibold text-[13px]'>
              {data.accountFrom.accountName ?? data.accountFrom.accountNumber}
              계좌에서&nbsp;
              <span className='text-hanaPrimary'>
                {data.accountTo.type === 'MyAccount'
                  ? data.accountTo.accountName
                  : `${data.accountTo.name}님`}
              </span>
              계좌로
            </span>
            <span className='text-hanaPrimary font-semibold text-[13px]'>
              {data.amount.toLocaleString()}원<span>송금</span>
            </span>
          </>
        );
      case 'inquiry':
        return (
          <>
            <span className=' font-semibold text-[13px]'>
              {data.accountFrom.accountName ?? data.accountFrom.accountNumber}
              계좌에서
            </span>
            <span className='text-hanaPrimary font-semibold text-[13px]'>
              {data.searchKeyword}
              <span>조회</span>
            </span>
          </>
        );
      case 'ticket':
        return (
          <>
            <span className='text-hanaPrimary font-semibold text-[13px]'>
              {data.bankName}
            </span>
            <span className='text-[13px] font-semibold'>번호표 발급</span>
          </>
        );
      case 'settlement':
        return (
          <>
            <span className='text-[13px] font-semibold'>
              {data.accountFrom.accountName ?? data.accountFrom.accountNumber}{' '}
              계좌로
            </span>
            <span className='text-[11px] font-semibold'>
              {data.memberList.map((member) => member.name).join(', ')}
            </span>
            <span className='text-hanaPrimary text-[13px] font-semibold'>
              {data.amount.toLocaleString()}원 정산 요청
            </span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className='flex-row flex-grow justify-between items-start rounded-[12px] h-full gap-4'>
      <div className='flex flex-col flex-grow gap-4'>
        <div className='flex gap-2 items-center'>
          <span className='text-fontBlack text-[16px] font-semibold'>
            {title}
          </span>
          <ColorChip color={chipColor}>{chipName}</ColorChip>
        </div>
        <div className='flex flex-col gap-2'>{renderDetails()}</div>
      </div>
      <div className='flex flex-col justify-between h-full'>
        <EditButton onClick={() => onEdit(id)}></EditButton>
        <DelButton onClick={() => onDelete(id)}></DelButton>
      </div>
    </Card>
  );
};

export default EditKeyword;
