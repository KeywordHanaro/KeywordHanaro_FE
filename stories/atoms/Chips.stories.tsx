import { Chip } from '@/components/atoms/Chips';
import { Member } from '@/data/member';
import { Meta, StoryObj } from '@storybook/react';

const mockMember: Member = {
  id: 1,
  name: '남인우',
  phoneNumber: '123-456-7890',
};

const meta: Meta<typeof Chip> = {
  title: 'Components/Atoms/Chips',
  component: Chip,
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    item: mockMember,
    canDelete: false,
    canAdd: false,
  },
  render: (args) => (
    <div style={{ width: '65px' }}>
      <Chip {...args} />
    </div>
  ),
};

export const CanDelete: Story = {
  args: {
    item: mockMember,
    canDelete: true,
    onRemove: (id) => console.log(`Removed member with id: ${id}`),
  },
  render: (args) => (
    <div style={{ width: '80px' }}>
      <Chip {...args} />
    </div>
  ),
};

export const Deleted: Story = {
  args: {
    item: mockMember,
    canAdd: true,
    className: 'text-[#B9B9B9] border-[#B9B9B9]',
  },
  render: (args) => (
    <div style={{ width: '65px' }}>
      <Chip {...args} />
    </div>
  ),
};
