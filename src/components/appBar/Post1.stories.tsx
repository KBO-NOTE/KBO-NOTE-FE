import type { Meta, StoryObj } from '@storybook/react-vite';
import Post from './Post1';

const meta: Meta<typeof Post> = {
  title: 'Components/appBar/Post1',
  component: Post,
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
