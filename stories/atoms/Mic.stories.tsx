import { MicRef } from '@/components/atoms/Mic';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';

const meta: Meta = {
  title: 'Components/Atoms/Mic',
  component: MicRef,
};

export default meta;

type Story = StoryObj<typeof MicRef>;

export const Default: Story = {};

export const Active: Story = {
  render: (args) => {
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      divRef.current?.click();
    }, []);

    return <MicRef {...args} ref={divRef} />;
  },
};
