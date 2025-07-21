import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavbarToggleButton } from './NavbarToggleButton';

const meta = {
	title: 'Components/NavbarToggleButton',
	component: NavbarToggleButton,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof NavbarToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
