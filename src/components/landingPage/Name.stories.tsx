import type { Meta, StoryObj } from '@storybook/react-vite';
import Name from './Name';

const meta: Meta<typeof Name> = {
  title: 'Components/landingPage/Name',
  component: Name,
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
