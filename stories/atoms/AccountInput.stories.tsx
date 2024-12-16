import { AccountInputRef } from '@/components/atoms/Inputs';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';

const meta: Meta = {
  title: 'Components/Atoms/AccountInput',
  component: AccountInputRef,
};

export default meta;

type Story = StoryObj<typeof AccountInputRef>;

export const Default: Story = {
  args: {
    placeHolder: '계좌번호 입력',
  },
};

export const Filled: Story = {
  render: (args) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.value = '987-654-321';
        inputRef.current.focus();
      }
    }, []);

    return (
      <AccountInputRef ref={inputRef} placeHolder='계좌번호 입력' {...args} />
    );
  },
};