import Header from '@/components/atoms/Header';
import SettlementRequest from '@/components/templates/settlement/SettlementRequest';

export default function SettlementPage() {
  return (
    <div>
      <Header text='키워드 정산' showActionButton={false} />
      <SettlementRequest />
    </div>
  );
}
