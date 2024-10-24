import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { bankList } from '@/data/bank';
import { FaAngleDown } from 'react-icons/fa';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function SelectBank() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [bankId, setBankId] = useState<number>(0);

  const handleScroll = () => {
    setHasScrolled(true);
  };
  const handleBankClick = (id: number) => {
    setBankId(id);
  };
  return (
    <>
      <div>
        <Drawer>
          <DrawerTrigger className='my-2 rounded-lg after:border-b-placeholderGray after:w-full after:border flex flex-col'>
            <div className='flex flex-row justify-between w-full h-full px-4 items-center'>
              <p
                className={cn(
                  ' text-left py-2',
                  bankId ? 'text-fontBlack' : 'text-placeholderGray'
                )}
              >
                {bankList.find((bank) => bank.id === bankId)?.bankname ??
                  '은행선택'}
              </p>
              <FaAngleDown />
            </div>
          </DrawerTrigger>
          <DrawerContent className='min-h-[300px] max-h-[calc(100vh-200px)] overflow-hidden transition-all duration-500 ease-out'>
            <DrawerHeader className='text-left'>
              <DrawerTitle>은행을 선택해주세요</DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <DrawerFooter
              onScroll={handleScroll}
              className={cn(
                ' overflow-y-scroll transition-all duration-500 ease-out',
                hasScrolled ? 'h-screen' : 'h-[300px]'
              )}
            >
              <div className='grid grid-cols-3 gap-3'>
                {bankList.map((bank) => (
                  <DrawerClose
                    key={bank.id}
                    onClick={() => handleBankClick(bank.id)}
                    className='col-span-1 aspect-square flex justify-center rounded-lg flex-col border-iconGray border-2 items-center'
                  >
                    <span className='aspect-square relative w-2/3'>
                      <Image
                        src={bank.image}
                        className='object-contain aspect-square p-2'
                        alt='test'
                        fill
                        sizes='min-width:40px height:40px'
                      />
                    </span>
                    <small>{bank.bankname}</small>
                  </DrawerClose>
                ))}
              </div>
              <DrawerClose className='bg-disableGray p-3 flex justify-center items-center rounded-lg'>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
