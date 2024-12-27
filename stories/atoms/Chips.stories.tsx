import { Chip } from '@/components/atoms/Chips';
import { Member } from '@/data/member';
import { groupMember } from '@/types/Keyword';
import { Meta, StoryObj } from '@storybook/react';
import { ClassValue } from 'clsx';
import { useState } from 'react';

// ClassValue 가져오기

const mockMember: groupMember = {
  name: '남인우',
  tel: '123-456-7890',
};

const meta: Meta<typeof Chip> = {
  title: 'Components/Atoms/Chips',
  component: Chip,
};

export default meta;

type ChipProps = {
  item: groupMember;
  canDelete?: boolean;
  canAdd?: boolean;
  className?: ClassValue;
  onRemove?: (tel: string) => void;
};

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

const CanDeleteComponent = (args: ChipProps) => {
  const [isShow, setIsShow] = useState(true);

  const handleShow = () => {
    setIsShow(!isShow);
  };

  return (
    <div style={{ width: '80px', display: isShow ? 'block' : 'none' }}>
      <Chip {...args} onRemove={handleShow} />
    </div>
  );
};

export const CanDelete: Story = {
  args: {
    item: mockMember,
    canDelete: true,
  },
  render: (args) => <CanDeleteComponent {...args} />,
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
