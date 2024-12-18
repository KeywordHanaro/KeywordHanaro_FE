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
  const CheckboxRender = () => {
    const [isChecked, setIsChecked] = useState(args.checked);

    const handleChange = (checked: boolean) => {
      setIsChecked(checked);
    };

    return <CheckBox {...args} checked={isChecked} onChange={handleChange} />;
  };

  CheckboxRender.displayName = `CheckboxRender_${args.checked ? 'Checked' : 'Default'}`;

  return CheckboxRender;
};

export const Default: Story = {
  render: createCheckboxRender({ checked: false }),
};

export const Checked: Story = {
  render: createCheckboxRender({ checked: true }),
};
