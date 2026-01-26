import type { Meta, StoryObj } from '@storybook/react-vite';
import Post2 from './Post2';

const meta: Meta<typeof Post2> = {
  title: 'Components/appBar/Post2',
  component: Post2,
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
