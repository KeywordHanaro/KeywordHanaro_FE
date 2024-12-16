import { Button } from '@/components/atoms/Button';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Atoms/Button',
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '기본 버튼',
    size: 'md',
    isDisabled: false,
  },
};

export const Small: Story = {
  args: {
    children: '기본 버튼(sm)',
    size: 'sm',
    isDisabled: false,
  },
};

export const Large: Story = {
  args: {
    children: '기본 버튼(lg)',
    size: 'lg',
    isDisabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성 버튼',
    size: 'md',
    isDisabled: true,
  },
};
