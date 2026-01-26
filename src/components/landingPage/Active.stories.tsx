import type { Meta, StoryObj } from '@storybook/react-vite';
import Active from './Active';

const meta: Meta<typeof Active> = {
  title: 'Components/landingPage/Active',
  component: Active,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    playerName: { control: 'text' },
    onClick: { action: 'onClick' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    playerName: "샘플 텍스트",
    onClick: () => console.log("clicked"),
  },
};
