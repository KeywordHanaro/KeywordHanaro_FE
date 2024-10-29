'use client';

import { useEffect, useState } from 'react';
import ColorChip from '../atoms/ColorChips';

type DocumentSelectorProps = {
  onSelect: (index: number) => void;
};

type DocumentID = {
  id: number;
  name: string;
};

const Documents: DocumentID[] = [
  { id: 1, name: '보금자리론' },
  { id: 2, name: '주택청약저축' },
  { id: 3, name: '주택청약부금' },
  { id: 4, name: '주택청약예금' },
  { id: 5, name: '추택청약예금' },
  { id: 6, name: '청년 주택드림 청약통장' },
  { id: 7, name: '사업자 주거래 우대통장' },
  { id: 8, name: '하나 빌리언달러 통장' },
];

const DocumentSelector: React.FC<DocumentSelectorProps> = ({ onSelect }) => {
  const handleSelect = (index: number) => {
    onSelect(index);
  };
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(!show);
    }, 2000);
  }, []);
  return (
    <>
      {show && (
        <div>
          {Documents.map((item, index) => (
            <span key={index}>
              <button onClick={() => handleSelect(item.id)}>
                <ColorChip color='blue'>{item.name}</ColorChip>
              </button>
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default DocumentSelector;
