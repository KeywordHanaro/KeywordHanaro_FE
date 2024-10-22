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
        className={`h-8 w-8 flex items-center justify-center border-1 rounded-2xl bg-white text-hanaPrimary
    ${checked ? ' border border-gray-100' : ' border border-hanaPrimary '}`}
      >
        {checked ? <FaUser /> : <FaCheck />}
      </div>
    </label>
  );
}

