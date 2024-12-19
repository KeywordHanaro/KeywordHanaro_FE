import Header from '@/components/atoms/Header';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  title: 'Components/Atoms/Header',
  component: Header,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '375px',
          backgroundColor: '#EFF0F4',
          height: '700px',
          border: '1px solid black',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    text: '기본 헤더',
    showBackButton: false,
    showActionButton: false,
  },
};

export const BackBtn: Story = {
  args: {
    text: '뒤로가기',
    showBackButton: true,
    showActionButton: false,
  },
};

export const ActionBtn: Story = {
  args: {
    text: '완료 버튼',
    showBackButton: false,
    showActionButton: true,
  },
};

export const BothBtn: Story = {
  args: {
    text: '모두 적용',
    showBackButton: true,
    showActionButton: true,
  },
};
