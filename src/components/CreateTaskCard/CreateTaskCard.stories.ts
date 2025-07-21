import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateTaskCard } from './CreateTaskCard';

const meta = {
	title: 'Components/CreateTaskCard',
	component: CreateTaskCard,
	tags: ['autodocs'],
	parameters: {
		// レイアウトを制御
		layout: 'fullscreen',
	},
} satisfies Meta<typeof CreateTaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
