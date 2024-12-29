import { Card } from '@/components/atoms/Card';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/Atoms/Card',
  component: Card,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    padding: 'p-[15px_20px]',
    className:
      'w-[370px] h-[300px] flex items-center justify-center text-xl font-bold',
    children: '카드',
  },
};
