import type { Meta, StoryObj } from '@storybook/react-vite';
import PlayerCard from './HomePlayerCard';

const meta: Meta<typeof PlayerCard> = {
  title: 'Components/HomePage/HomePlayerCard',
  component: PlayerCard,
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
