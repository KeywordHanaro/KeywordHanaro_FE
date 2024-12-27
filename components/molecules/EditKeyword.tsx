'use client';

import { getColorByType, getNameByType } from '@/data/keyword';
import { groupMember, UseKeywordResponse } from '@/types/Keyword';
import { formatNumberWithCommas } from '@/lib/utils';
import { DelButton, EditButton } from '../atoms/Button';
import { Card } from '../atoms/Card';
import ColorChip from '../atoms/ColorChips';

type EditKeywordProps = {
  data: UseKeywordResponse;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const EditKeyword = ({ data, onEdit, onDelete }: EditKeywordProps) => {
  const { id, type, name } = data;
  const chipColor = getColorByType(type);
  const chipName = getNameByType(type);

  const renderDetails = () => {
    switch (type) {
      case 'TRANSFER':
        return (
          <>
            <span className='font-semibold text-[13px]'>
              {data.account.name ?? data.account.accountNumber}
              에서&nbsp;
              <span className='text-hanaPrimary'>
                {data.subAccount.type === 'MyAccount'
                  ? data.subAccount.name
                  : `${data.subAccount.name}님`}
              </span>
              &nbsp;로
            </span>
            {data.checkEveryTime ? (
              <span className='text-hanaPrimary font-semibold text-[13px]'>
                매번 다르게<span> 송금</span>
              </span>
            ) : (
              <span className='text-hanaPrimary font-semibold text-[13px]'>
                {formatNumberWithCommas(data.amount?.toString() || '')}원
                <span> 송금</span>
              </span>
            )}
          </>
        );
      case 'INQUIRY':
        return (
          <div className='flex flex-wrap'>
            <span className=' font-semibold text-[13px]'>
              {data.account.name ?? data.account.accountNumber}
              계좌에서 &nbsp;
              <span className='text-hanaPrimary font-semibold text-[13px]'>
                {data.inquiryWord} 조회
              </span>
            </span>
          </div>
        );
      case 'TICKET':
        return (
          <>
            <span className=' text-hanaPrimary font-semibold text-[13px]'>
              {data.desc}
            </span>
          </>
        );
      case 'SETTLEMENT':
      case 'DUES':
        return (
          <>
            <span className='text-[13px] font-semibold'>
              {data.account.name ?? data.account.accountNumber} 계좌로
            </span>
            <span className='text-[11px] font-semibold'>
              <span className='text-[11px] font-semibold'>
                {(() => {
                  const groupMembers: groupMember[] = Array.isArray(
                    data.groupMember
                  )
                    ? data.groupMember
                    : JSON.parse(data.groupMember);
                  return groupMembers
                    .map((member: groupMember) => member.name)
                    .join(', ');
                })()}
              </span>
            </span>
            {data.checkEveryTime ? (
              <span className='text-hanaPrimary text-[13px] font-semibold'>
                매번 다르게 정산 요청
              </span>
            ) : (
              <span className='text-hanaPrimary text-[13px] font-semibold'>
                {formatNumberWithCommas(data.amount?.toString() || '')}원 정산
                요청
              </span>
            )}
          </>
        );
      case 'MULTI':
        return (
          <span className=' text-hanaPrimary font-semibold text-[13px]'>
            {data.desc}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Card className='flex-row flex-grow justify-between items-start rounded-[12px] h-full gap-4'>
      <div className='flex flex-col flex-grow gap-4 h-full justify-between'>
        <div className='flex gap-2 items-center'>
          <span className='text-fontBlack text-[16px] font-semibold'>
            {name}
          </span>
          <ColorChip color={chipColor}>{chipName}</ColorChip>
        </div>
        <div className='flex flex-col gap-2'>{renderDetails()}</div>
      </div>
      <div className='flex flex-col justify-between h-full gap-3'>
        <EditButton onClick={() => onEdit(id)}></EditButton>
        <DelButton onClick={() => onDelete(id)}></DelButton>
      </div>
    </Card>
  );
};

export default EditKeyword;
