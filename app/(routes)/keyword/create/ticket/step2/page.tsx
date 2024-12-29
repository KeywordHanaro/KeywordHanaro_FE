'use client';

import SelectBranch from '@/components/templates/createKeyword/ticket/SelectBranch';
import { useTicket } from '@/contexts/TicketContext';
import { TBranch } from '@/types/Bank';
import { useRouter } from 'next/navigation';

export default function CreateTicketStep2Page() {
  const router = useRouter();
  const { setSelectedBranch } = useTicket();

  const handleSetBranch = (branch: TBranch) => {
    setSelectedBranch(branch);
    router.push('/keyword/create/ticket/step3');
  };

  return <SelectBranch handleSetBranch={handleSetBranch} autoStart={true} />;
}
