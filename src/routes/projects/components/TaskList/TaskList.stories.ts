import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TaskList } from './TaskList';
import {
	createCompletedTask,
	createIncompleteTask,
} from '../../../../mocks/taskMocks';

const meta = {
	title: 'Components/TaskList',
	component: TaskList,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			description: 'タスクリストのタイトル',
		},
		tasks: {
			description: 'タスクの配列',
		},
		onToggleComplete: {
			description: '完了状態の切り替え関数',
		},
		emptyMessage: {
			description: 'タスクがない場合のメッセージ',
		},
	},
	args: {
		onToggleComplete: fn(),
	},
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

// 各Storyで使用するタスクを動的に生成
const generateIncompleteTasks = () =>
	Array.from({ length: 4 }, () => createIncompleteTask({ projectId: '1' }));
const generateCompletedTasks = () =>
	Array.from({ length: 3 }, () => createCompletedTask({ projectId: '1' }));
const generateMixedTasks = () => [
	...generateIncompleteTasks(),
	...generateCompletedTasks(),
];

export const IncompleteTaskList: Story = {
	args: {
		title: '未完了タスク',
		tasks: generateIncompleteTasks(),
		emptyMessage: '未完了のタスクはありません。',
	},
	parameters: {
		docs: {
			description: {
				story: '未完了のタスクリストです。複数のタスクが表示されます。',
			},
		},
	},
};

export const CompletedTaskList: Story = {
	args: {
		title: '完了済みタスク',
		tasks: generateCompletedTasks(),
		emptyMessage: '完了済みのタスクはありません。',
	},
	parameters: {
		docs: {
			description: {
				story:
					'完了済みのタスクリストです。完了済みのタスクのみが表示されます。',
			},
		},
	},
};

export const EmptyList: Story = {
	args: {
		title: 'タスクリスト',
		tasks: [],
		emptyMessage: 'タスクがありません。',
	},
	parameters: {
		docs: {
			description: {
				story: '空のタスクリストです。emptyMessageが表示されます。',
			},
		},
	},
};

export const MixedTaskList: Story = {
	args: {
		title: 'すべてのタスク',
		tasks: generateMixedTasks(),
		emptyMessage: 'タスクがありません。',
	},
	parameters: {
		docs: {
			description: {
				story: '完了済みと未完了のタスクが混在するリストです。',
			},
		},
	},
};
