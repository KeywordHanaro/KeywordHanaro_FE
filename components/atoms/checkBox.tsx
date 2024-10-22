import { FaCheck } from 'react-icons/fa6';

type CheckboxAtomProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function CheckBox({ checked, onChange }: CheckboxAtomProps) {
  return (
    <label className='flex items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={checked}
        onChange={() => onChange(!checked)}
        className='hidden' // 기본 체크박스 숨기기
      />
      <div
        className={`h-6 w-6 flex items-center justify-center border-1 rounded-lg shadow-lg
    ${checked ? 'bg-hanaPrimary border border-hanaPrimary text-white' : 'bg-white border border-gray-200 text-gray-300'}`}
      >
        <FaCheck />
      </div>
    </label>
  );
}
