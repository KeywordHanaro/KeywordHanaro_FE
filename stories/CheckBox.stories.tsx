import CheckBox from '@/components/atoms/CheckBox';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta = {
  title: 'Components/Atoms/CheckBox',
  component: CheckBox,
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

const createCheckboxRender = (args: { checked: boolean }) => {
  return () => {
    const [isChecked, setIsChecked] = useState(args.checked);

    const handleChange = (checked: boolean) => {
      setIsChecked(checked);
      console.log('Checkbox changed:', checked);
    };

    return <CheckBox {...args} checked={isChecked} onChange={handleChange} />;
  };
};

export const Default: Story = {
  render: createCheckboxRender({ checked: true }),
};

export const UnChecked: Story = {
  render: createCheckboxRender({ checked: false }),
};
