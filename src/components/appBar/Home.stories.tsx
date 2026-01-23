import type { Meta, StoryObj } from '@storybook/react-vite';
import Appbar from './Home';

const meta: Meta<typeof Appbar> = {
  title: 'Components/appBar/Home',
  component: Appbar,
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
