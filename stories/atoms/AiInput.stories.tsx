import { AIInputRef } from '@/components/atoms/Inputs';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';

const meta: Meta = {
  title: 'Components/Atoms/AiInput',
  component: AIInputRef,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AIInputRef>;

export const Default: Story = {
  args: {
    isLoading: false,
  },
};

export const Filled: Story = {
  args: {
    isLoading: false,
  },

  render: (args) => {
    const InputWithRef = () => {
      const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        if (inputRef.current) {
          inputRef.current.value = '적금 추천해줘';
          inputRef.current.focus();
        }
      }, []);

      const onSubmit = () => {
        if (inputRef.current) {
          alert(inputRef.current.value + '가 입력되었습니다.');
        }
      };

      return (
        <AIInputRef
          ref={inputRef}
          {...args}
          onSubmit={onSubmit}
          formClassName={''}
        />
      );
    };

    return <InputWithRef />;
  },
};
