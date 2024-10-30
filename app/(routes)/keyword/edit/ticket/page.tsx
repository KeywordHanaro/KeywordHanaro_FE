'use client';

import SelectBranch from '@/components/templates/createKeyword/ticket/SelectBranch';
import { useTicket } from '@/contexts/TicketContext';
import { Branch } from '@/data/bank';

// import { useRouter } from 'next/navigation';

export default function EditTicketKeywordPage() {
  // const router = useRouter();
  const { setSelectedBranch, selectedBranch } = useTicket();
  const handleSetBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    // router.push('/keyword/create/ticket/step3');
  };
  return (
    <>
      <h1>현재 영업점 {selectedBranch?.branchName}</h1>
      <SelectBranch handleSetBranch={handleSetBranch} />
    </>
  );
}
