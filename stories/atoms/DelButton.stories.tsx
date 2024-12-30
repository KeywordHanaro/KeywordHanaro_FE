import { DelButton } from '@/components/atoms/Button';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/Atoms/DelButton',
  component: DelButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DelButton>;

export const Default: Story = {
  args: {
    size: 'lg',
  },
};
