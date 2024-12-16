import { EditButton } from '@/components/atoms/Button';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/Atoms/EditButton',
  component: EditButton,
};

export default meta;

type Story = StoryObj<typeof EditButton>;

export const Default: Story = {};
