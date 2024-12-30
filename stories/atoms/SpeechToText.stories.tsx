import SpeechToText from '@/components/SpeechToText';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/Atoms/SpeechToText',
  component: SpeechToText,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SpeechToText>;

export const Default: Story = {
  args: {
    autoStart: false,
    placeholder: '음성인식 된 내용이 나타납니다.',
  },
};

export const Active: Story = {
  args: {
    autoStart: true,
    placeholder: '음성인식이 활성화되었습니다.',
  },
};
