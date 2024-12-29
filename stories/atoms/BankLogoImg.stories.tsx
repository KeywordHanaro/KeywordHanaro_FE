import { BankLogoImg } from '@/components/atoms/BankLogoImg';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BankLogoImg> = {
  title: 'Components/Atoms/BankLogoImg',
  component: BankLogoImg,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '375px', height: '700px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BankLogoImg>;

export const KDB: Story = {
  args: {
    bankId: 2,
  },
};

export const IBK: Story = {
  args: {
    bankId: 3,
  },
};

export const KB: Story = {
  args: {
    bankId: 2,
  },
};

export const SH: Story = {
  args: {
    bankId: 7,
  },
};

export const NH: Story = {
  args: {
    bankId: 11,
  },
};

export const Woori: Story = {
  args: {
    bankId: 20,
  },
};

export const SC: Story = {
  args: {
    bankId: 23,
  },
};

export const Citi: Story = {
  args: {
    bankId: 27,
  },
};

export const DGB: Story = {
  args: {
    bankId: 31,
  },
};

export const BNK: Story = {
  args: {
    bankId: 32,
  },
};

export const GJ: Story = {
  args: {
    bankId: 34,
  },
};

export const Shinhan: Story = {
  args: {
    bankId: 35,
  },
};

export const JB: Story = {
  args: {
    bankId: 37,
  },
};

export const KN: Story = {
  args: {
    bankId: 39,
  },
};

export const SME: Story = {
  args: {
    bankId: 45,
  },
};

export const Shinhyup: Story = {
  args: {
    bankId: 48,
  },
};

export const Post: Story = {
  args: {
    bankId: 71,
  },
};

export const Hana: Story = {
  args: {
    bankId: 81,
  },
};

export const Kakao: Story = {
  args: {
    bankId: 90,
  },
};

export const Toss: Story = {
  args: {
    bankId: 92,
  },
};

export const SBI: Story = {
  args: {
    bankId: 103,
  },
};
