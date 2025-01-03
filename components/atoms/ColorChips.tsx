import { PropsWithChildren } from 'react';

type ColorChipProps = {
  color: keyof typeof colorMap;
};

const colorMap: Record<string, { bgColor: string; textColor: string }> = {
  grey: { bgColor: '#F4F5F6', textColor: '#7B8894' },
  pink: { bgColor: '#FCF0F6', textColor: '#F06595' },
  green: { bgColor: '#E9FEE8', textColor: '#72B16D' },
  yellow: { bgColor: '#FFFBDC', textColor: '#D89B00' },
  blue: { bgColor: '#E7F5FF', textColor: '#4DABF7' },
  orange: { bgColor: '#FFEFDB', textColor: '#FF9100' },
};

export default function ColorChip({
  children,
  color,
}: PropsWithChildren<ColorChipProps>) {
  const { bgColor, textColor } = colorMap[color];
  return (
    <div
      className='items-center text-center rounded-3xl px-2 py-[2px] w-fit text-[11px] font-medium'
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <span>{children}</span>
    </div>
  );
}
