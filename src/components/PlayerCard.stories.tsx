import type { Meta, StoryObj } from '@storybook/react-vite';
import PlayerCard from './PlayerCard';

const meta: Meta<typeof PlayerCard> = {
  title: 'Components/PlayerCard',
  component: PlayerCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    imageUrl: { control: 'text' },
    isSelected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "샘플 텍스트",
    imageUrl: "https://via.placeholder.com/150",
    isSelected: false,
  },
};
