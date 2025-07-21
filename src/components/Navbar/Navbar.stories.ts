import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from './Navbar';

const meta = {
	title: 'Components/Navbar',
	component: Navbar,
	tags: ['autodocs'],
	parameters: {
		// レイアウトを制御
		layout: 'fullscreen',
	},
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
