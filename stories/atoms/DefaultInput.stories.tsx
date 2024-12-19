import { DefaultInputRef } from '@/components/atoms/Inputs';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';

const meta: Meta = {
  title: 'Components/Atoms/DefaultInput',
  component: DefaultInputRef,
};

export default meta;

type Story = StoryObj<typeof DefaultInputRef>;

export const Default: Story = {};

export const Focus: Story = {
  render: (args) => {
    const InputWithFocus = () => {
      const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        if (inputRef.current) {
          inputRef.current.value = 'DefaultInput 포커스';
          inputRef.current.focus();
        }
      }, []);

      return <DefaultInputRef ref={inputRef} {...args} />;
    };

    return <InputWithFocus />;
  },
};

export const Error: Story = {
  args: {
    required: true,
    error: 'This field is required.',
  },
  render: (args) => {
    const InputWithError = () => {
      const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.blur();
        }
      }, []);

      return <DefaultInputRef ref={inputRef} {...args} />;
    };

    return <InputWithError />;
  },
};
