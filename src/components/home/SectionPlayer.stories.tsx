import type { Meta, StoryObj } from '@storybook/react-vite';
import SectionPlayer from './SectionPlayer';

const meta: Meta<typeof SectionPlayer> = {
  title: 'Components/home/SectionPlayer',
  component: SectionPlayer,
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
