import { KeywordInputRef } from '@/components/atoms/Inputs';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';

const meta: Meta = {
  title: 'Components/Atoms/KeywordInput',
  component: KeywordInputRef,
};

export default meta;

type Story = StoryObj<typeof KeywordInputRef>;

export const Default: Story = {
  args: {
    placeHolder: '키워드 이름을 작성해주세요 (예: 줄서줘)',
  },
};

export const Filled: Story = {
  render: (args) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.value = '남인우 용돈';
        inputRef.current.focus();
      }
    }, []);

    return <KeywordInputRef ref={inputRef} {...args} />;
  },
};
