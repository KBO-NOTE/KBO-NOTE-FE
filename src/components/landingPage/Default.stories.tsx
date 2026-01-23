import type { Meta, StoryObj } from '@storybook/react-vite';
import DefaultComponent from './Default';

const meta: Meta<typeof DefaultComponent> = {
  title: 'Components/landingPage/Default',
  component: DefaultComponent,
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
