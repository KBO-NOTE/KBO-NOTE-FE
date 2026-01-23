import type { Meta, StoryObj } from '@storybook/react-vite';
import Popular from './Popular';

const meta: Meta<typeof Popular> = {
  title: 'Components/landingPage/Popular',
  component: Popular,
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
