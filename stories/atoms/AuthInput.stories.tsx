import { AuthInputRef } from '@/components/atoms/Inputs';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';

const meta: Meta = {
  title: 'Components/Atoms/AuthInput',
  component: AuthInputRef,
};

export default meta;
// 일단 default만
type Story = StoryObj<typeof AuthInputRef>;

export const Default: Story = {};
