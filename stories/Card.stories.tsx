import { Card } from '@/components/atoms/Card';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/Atoms/Card',
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    padding: 'p-[15px_20px]',
    className: '',
    children: '기본 카드',
  },
};
