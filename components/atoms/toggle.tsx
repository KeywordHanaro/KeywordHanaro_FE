'use client';

import { useState } from 'react';

interface ToggleProps {
  initialState?: boolean;
  onToggle?: (stats: boolean) => void;
}
const Toggle: React.FC<ToggleProps> = ({ initialState = false, onToggle }) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    setIsOn((prev) => {
      const newState = !prev;
      if (onToggle) {
        onToggle(newState); //상태 변경 시 외부 함수 호출
      }
      return newState;
    });
  };

  return (
    <div
      className={`toggle-container ${isOn ? 'on' : ''}`}
      onClick={handleToggle}
    >
      <div className='toggle-switch'></div>
    </div>
  );
};

export default Toggle;
