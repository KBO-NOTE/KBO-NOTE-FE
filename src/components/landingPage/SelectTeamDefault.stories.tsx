import type { Meta, StoryObj } from '@storybook/react-vite';
import SelectTeam from './SelectTeamDefault';

const meta: Meta<typeof SelectTeam> = {
  title: 'Components/landingPage/SelectTeamDefault',
  component: SelectTeam,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    TeamNameProp: { control: 'text' },
    onClick: { action: 'onClick' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    TeamNameProp: "샘플 텍스트",
    onClick: () => console.log("clicked"),
  },
};
