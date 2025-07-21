import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'link', 'danger', 'danger-link'],
		},
		onClick: { action: 'clicked' },
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Default Button',
		variant: 'default',
		size: 'md',
	},
};

export const Link: Story = {
	args: {
		...Default.args,
		children: 'Link Button',
		variant: 'link',
	},
};

export const Danger: Story = {
	args: {
		...Default.args,
		children: 'Danger Button',
		variant: 'danger',
	},
};

export const DangerLink: Story = {
	args: {
		...Default.args,
		children: 'Danger Link Button',
		variant: 'danger-link',
	},
};

export const Small: Story = {
	args: {
		...Default.args,
		children: 'Small Button',
		size: 'sm',
	},
};

export const Large: Story = {
	args: {
		...Default.args,
		children: 'Large Button',
		size: 'lg',
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		children: 'Disabled Button',
		disabled: true,
	},
};
