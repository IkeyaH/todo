import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TaskCard } from './TaskCard';
import {
	mockCompletedTask,
	mockIncompleteTask,
	mockTaskWithoutDescription,
	mockOverdueTask,
} from '../../../../mocks/taskMocks';

const meta = {
	title: 'Components/TaskCard',
	component: TaskCard,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		task: {
			description: 'タスクオブジェクト',
		},
		onToggleComplete: {
			description: '完了状態の切り替え関数',
		},
	},
	args: {
		onToggleComplete: fn(),
	},
} satisfies Meta<typeof TaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Incomplete: Story = {
	args: {
		task: mockIncompleteTask,
	},
	parameters: {
		docs: {
			description: {
				story: '未完了のタスクカードです。完了ボタンが緑色で表示されます。',
			},
		},
	},
};

export const Completed: Story = {
	args: {
		task: mockCompletedTask,
	},
	parameters: {
		docs: {
			description: {
				story:
					'完了済みのタスクカードです。タイトルに取り消し線が表示され、背景が灰色になります。',
			},
		},
	},
};

export const WithoutDescription: Story = {
	args: {
		task: mockTaskWithoutDescription,
	},
	parameters: {
		docs: {
			description: {
				story: '説明がないタスクカードです。説明部分は表示されません。',
			},
		},
	},
};

export const Overdue: Story = {
	args: {
		task: mockOverdueTask,
	},
	parameters: {
		docs: {
			description: {
				story:
					'期限切れのタスクカードです。期限日が赤いテキストで強調表示されます。',
			},
		},
	},
};
