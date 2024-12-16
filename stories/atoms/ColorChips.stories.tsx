import ColorChip from '@/components/atoms/ColorChips';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ColorChip> = {
  title: 'Components/Atoms/ColorChip',
  component: ColorChip,
};

export default meta;

type Story = StoryObj<typeof ColorChip>;

export const Grey: Story = {
  args: {
    color: 'grey',
    children: '남인우',
  },
};

export const Pink: Story = {
  args: {
    color: 'pink',
    children: '남인우',
  },
};

export const Green: Story = {
  args: {
    color: 'green',
    children: '남인우',
  },
};

export const Yellow: Story = {
  args: {
    color: 'yellow',
    children: '남인우',
  },
};

export const Blue: Story = {
  args: {
    color: 'blue',
    children: '남인우',
  },
};
