import { ArrowLeft } from 'lucide-react';

type HeaderProps = {
  text?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showActionButton?: boolean;
  actionLabel?: string;
  onAction?: () => void;
};

export default function Header({
  text = '',
  showBackButton = true,
  onBack,
  showActionButton = true,
  actionLabel = '완료',
  onAction,
}: HeaderProps) {
  return (
    <div className='flex justify-center items-center w-full h-20 bg-white'>
      {/* 뒤로 가기 버튼 */}
      {showBackButton && (
        <button className='pl-[20px] pr-[8px]' onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
      )}

      {/* text */}
      <h1 className='text-[18px] font-semibold flex-grow'>{text}</h1>

      {/* 완료 버튼 */}
      {showActionButton && (
        <button
          onClick={onAction}
          className='text-[18px] text-black text-right px-[20px]'
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
