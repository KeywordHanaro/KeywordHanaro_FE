import { FaCheck, FaUser } from 'react-icons/fa';

type UserCheckBoxProps = {
  checked: boolean;
  onChange: (userChecked: boolean) => void;
};

export default function UserCheckBox({ checked, onChange }: UserCheckBoxProps) {
  return (
    <label className='flex items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={checked}
        onChange={() => onChange(!checked)}
        className='hidden'
      />
      <div
        className={`h-[40px] w-[40px] flex items-center justify-center border-1 rounded-full bg-white text-hanaPrimary text-xl
    ${checked ? ' border border-hanaPrimary' : ' border border-gray-100 '}`}
      >
        {checked ? <FaCheck /> : <FaUser />}
      </div>
    </label>
  );
}
