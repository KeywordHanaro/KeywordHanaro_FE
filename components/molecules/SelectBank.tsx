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
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { bankList } from '@/data/bank';
import { FaAngleDown } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState, memo } from 'react';
import { cn, levenshtein } from '@/lib/utils';

type SelectBankProps = {
  onSelect: (index: number) => void;
  value?: number;
  useStt?: boolean;
};

const SelectBank = memo(function SelectBank({
  onSelect,
  value,
  useStt,
}: SelectBankProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [bankId, setBankId] = useState<number>(value ?? 0);

  const handleScroll = () => {
    setHasScrolled(true);
  };
  const handleSelect = (id: number) => {
    setBankId(id);
    onSelect(id);
  };

  const { result, setResult } = useVoiceInputSession();
  useEffect(() => {
    if (useStt) {
      const cleanedResult = result.replace(/[\s-]/g, '');
      if (cleanedResult && !/^\d+$/.test(cleanedResult)) {
        const threshold = 0.5; // 허용할 최대 편집 거리
        let bestMatch = null;
        let minDistance = Infinity;

        for (const bank of bankList) {
          const distance = levenshtein(
            bank.bankname,
            cleanedResult.toLowerCase()
          );
          if (distance < minDistance && distance <= threshold) {
            minDistance = distance;
            bestMatch = bank;
          }
        }
        if (bestMatch) {
          setResult('');
          setBankId(bestMatch.id);
          onSelect(bestMatch.id);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);
  return (
    <>
      <div className='w-full'>
        <Drawer>
          <DrawerTrigger className='my-2 w-full rounded-lg after:w-full after:border flex flex-col'>
            <div className='flex flex-row justify-between w-full h-full font-semibold text-[18px] items-center'>
              <p
                className={cn(
                  ' text-left py-2',
                  bankId ? 'text-hanaPrimary' : 'text-placeholderGray'
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
                    onClick={() => handleSelect(bank.id)}
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
});

export default SelectBank;
