import {
  MultiForm,
  MultiKeyword,
  MultiTicket,
  MultiTransfer,
} from '@/data/multiKeyword';
import MultiKeywordSettlement from '../../molecules/SettlementMSG';
import MultiKeywordTicket from '../../molecules/TIcketMSG';
import MultiKeywordTransfer from '../../molecules/TransferMSG';

export default function MultiKeywordCompletion({
  data,
}: {
  data: MultiKeyword;
}) {
  const isMultiTransfer = (data: MultiKeyword): data is MultiTransfer => {
    return data.multiKeyword === 'MultiTransfer';
  };

  const isMultiForm = (data: MultiKeyword): data is MultiForm => {
    return data.multiKeyword === 'MultiForm';
  };

  const isMultiTicket = (data: MultiKeyword): data is MultiTicket => {
    return data.multiKeyword === 'MultiTicket';
  };

  const renderContent = () => {
    if (isMultiTransfer(data)) {
      return <MultiKeywordTransfer data={data} />;
    }

    if (isMultiForm(data)) {
      return <MultiKeywordSettlement data={data} />;
    }

    if (isMultiTicket(data)) {
      return <MultiKeywordTicket data={data} />;
    }

    return null;
  };

  return (
    <div className='flex flex-col justify-between p-[20px] w-full h-full rounded-[16px] bg-[#fff] shadow-[0px_4px_8px_0px_rgba(136,137,157,0.30)]'>
      {renderContent()}
    </div>
  );
}
