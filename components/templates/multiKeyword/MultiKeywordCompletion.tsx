import { MultiResponse } from '@/contexts/MultiKeywordUseContext';
import { MultiKeywordDetail } from '@/types/Keyword';
import MultiKeywordSettlement from '../../molecules/SettlementMSG';
import MultiKeywordTicket from '../../molecules/TIcketMSG';
import MultiKeywordTransfer from '../../molecules/TransferMSG';

export default function MultiKeywordCompletion({
  data,
}: {
  data: MultiResponse;
}) {
  const renderContent = () => {
    if ('id' in data && 'account' in data && 'subAccount' in data) {
      // TransferResponse 타입인 경우
      return <MultiKeywordTransfer data={data} />;
    }

    if ('branchName' in data) {
      // IssueTicketResponse 타입인 경우
      return <MultiKeywordTicket data={data} />;
    }

    if ('keyword' in data) {
      // { keyword: UseKeywordResponse; amount?: number } 타입인 경우
      if (data.keyword.type === 'SETTLEMENT') {
        return <MultiKeywordSettlement data={data} />;
      }
    }

    return null;
  };

  return (
    <div className='flex flex-col justify-between p-[20px] w-full h-full rounded-[16px] bg-[#fff] shadow-[0px_4px_8px_0px_rgba(136,137,157,0.30)]'>
      {renderContent()}
    </div>
  );
}
