import { SearchInpuRef } from '@/components/atoms/Inputs';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';

const meta: Meta = {
  title: 'Components/Atoms/SearchInput',
  component: SearchInpuRef,
};

export default meta;

type Story = StoryObj<typeof SearchInpuRef>;

export const Default: Story = {
  render: (args) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
      alert(inputRef.current?.value + '가 입력되었습니다.');
    };

    return <SearchInpuRef ref={inputRef} {...args} onSubmit={handleSubmit} />;
  },
};
