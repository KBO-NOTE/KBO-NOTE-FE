import type { Meta, StoryObj } from '@storybook/react-vite';
import Active from './Active';

const meta: Meta<typeof Active> = {
  title: 'Components/home/Active',
  component: Active,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
};
