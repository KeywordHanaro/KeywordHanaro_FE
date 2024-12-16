import { Modal } from '@/components/atoms/Modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta = {
  title: 'Components/Atoms/Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div>
        <Modal
          onChange={handleOpen}
          open={isOpen}
          title={'모달'}
          children={'본문'}
        />

        <button
          style={{
            backgroundColor: '#B9B9B9',
            padding: '10px',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
          onClick={handleOpen}
        >
          모달 Show
        </button>
      </div>
    );
  },
};

export const Active: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleOpen = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div>
        <Modal
          onChange={handleOpen}
          open={isOpen}
          title={'모달 활성화 상태'}
          children={'본문'}
        />

        <button
          style={{
            backgroundColor: '#B9B9B9',
            padding: '10px',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
          onClick={handleOpen}
        >
          모달 Show
        </button>
      </div>
    );
  },
};
