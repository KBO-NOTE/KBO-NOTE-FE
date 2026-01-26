import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './ButtonOutline';

const meta: Meta<typeof Button> = {
  title: 'Components/button/ButtonOutline',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    buttonText: { control: 'text' },
    onClick: { action: 'onClick' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttonText: "샘플 텍스트",
    onClick: () => console.log("clicked"),
  },
};
