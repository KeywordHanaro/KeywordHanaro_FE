import UserCheckBox from '@/components/atoms/UserCheckBox';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta = {
  title: 'Components/Atoms/UserCheckBox',
  component: UserCheckBox,
};

export default meta;

type Story = StoryObj<typeof UserCheckBox>;

export const Default: Story = {
  render: () => {
    const UserCheckBoxWithState = () => {
      const [isChecked, setIsChecked] = useState(false);

      const handleClick = () => {
        setIsChecked(!isChecked);
      };

      return <UserCheckBox checked={isChecked} onChange={handleClick} />;
    };

    return <UserCheckBoxWithState />;
  },
};

export const Checked: Story = {
  render: () => {
    const UserCheckBoxWithState = () => {
      const [isChecked, setIsChecked] = useState(true);

      const handleClick = () => {
        setIsChecked(!isChecked);
      };

      return <UserCheckBox checked={isChecked} onChange={handleClick} />;
    };

    return <UserCheckBoxWithState />;
  },
};
