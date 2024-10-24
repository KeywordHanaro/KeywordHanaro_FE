'use client';

import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/atoms/Modal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Categories = {
  name: string;
  path: string;
};

const categories: Categories[] = [
  {
    name: '송금',
    path: '/document',
  },
  { name: '입금', path: '/document' },
  { name: '출금', path: '/document' },
];

/** Need Fetching to get waitingQueue, people, etc */

export default function TicketDetailPage() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    setTimeout(() => {
      handleOpen();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='p-2'>
      <Modal
        open={openModal}
        title='미리 서류를 작성해주세요'
        onChange={handleOpen}
      >
        {categories.map((item, index) => (
          <>
            <Button
              key={index}
              className='w-full'
              onClick={() => router.push(item.path)}
            >
              {item.name}
            </Button>
          </>
        ))}
        <Button className='w-full' onClick={handleOpen}>다른 업무</Button>
      </Modal>
    </div>
  );
}
