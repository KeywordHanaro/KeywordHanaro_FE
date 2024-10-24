'use client';

import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/atoms/Modal';
import { useEffect, useState } from 'react';

const categories = [
  {
    name: '송금',
    path: '/',
  },
  { name: '입금', path: '/' },
  { name: '출금', path: '/' },
];

/** Need Fetching to get waitingQueue, people, etc */

export default function TicketDetailPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    setTimeout(() => {
      handleOpen();
    }, 2000);
  }, []);

  return (
    <div className='p-2'>
      <Modal
        open={openModal}
        title='미리 서류를 작성해주세요'
        onChange={handleOpen}
      >
        {categories.map((item,index)=>(
          <>
            <Button key={index} className='w-full'>{item.name}</Button>
          </>
        ))}
        <Button className='w-full'>다른 업무</Button>
      </Modal>
    </div>
  );
}
