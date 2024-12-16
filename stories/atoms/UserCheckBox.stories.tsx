import UserCheckBox from '@/components/atoms/UserCheckBox';
import { Meta, StoryObj } from '@storybook/react';
import { UserCheckIcon } from 'lucide-react';
import { useState } from 'react';

const meta: Meta = {
  title: 'Components/Atoms/UserCheckBox',
  component: UserCheckBox,
};

export default meta;

type Story = StoryObj<typeof UserCheckBox>;

export const Default: Story = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(false);
    const handelClick = () => {
      setIsChecked(!isChecked);
    };
    return <UserCheckBox checked={isChecked} onChange={handelClick} />;
  },
};

export const Checked: Story = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(true);
    const handelClick = () => {
      setIsChecked(!isChecked);
    };
    return <UserCheckBox checked={isChecked} onChange={handelClick} />;
  },
};
