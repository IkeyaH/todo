import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import type { Task } from '../types';

type TaskStore = {
	tasks: Task[];
	addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
	updateTask: (
		id: string,
		updates: Partial<Omit<Task, 'id' | 'createdAt'>>
	) => void;
	deleteTask: (id: string) => void;
	getTasksByProjectId: (projectId: string) => Task[];
	toggleTaskComplete: (id: string) => void;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
	tasks: [
		{
			id: '1',
			projectId: '1',
			title: 'タスク1 - プロジェクトアルファ',
			description: 'プロジェクトアルファの最初のタスクです',
			dueDate: new Date('2025-07-31'),
			createdAt: new Date('2025-07-21'),
		},
		{
			id: '2',
			projectId: '1',
			title: 'タスク2 - プロジェクトアルファ',
			description: 'プロジェクトアルファの2番目のタスクです',
			dueDate: new Date('2025-08-15'),
			completedAt: new Date('2025-07-21'),
			createdAt: new Date('2025-07-21'),
		},
		{
			id: '3',
			projectId: '1',
			title: 'タスク3 - プロジェクトアルファ',
			description: 'プロジェクトアルファの3番目のタスクです',
			createdAt: new Date('2025-07-21'),
		},
		{
			id: '4',
			projectId: '1',
			title: 'タスク4 - プロジェクトアルファ',
			description: 'プロジェクトアルファの4番目のタスクです',
			dueDate: new Date('2025-09-01'),
			createdAt: new Date('2025-07-21'),
		},
	],
	addTask: task => {
		set(state => ({
			tasks: [
				...state.tasks,
				{
					...task,
					id: uuid(),
					createdAt: new Date(),
				},
			],
		}));
	},
	updateTask: (id, updates) => {
		set(state => ({
			tasks: state.tasks.map(task =>
				task.id === id ? { ...task, ...updates } : task
			),
		}));
	},
	deleteTask: id => {
		set(state => ({
			tasks: state.tasks.filter(task => task.id !== id),
		}));
	},
	getTasksByProjectId: projectId => {
		return get().tasks.filter(task => task.projectId === projectId);
	},
	toggleTaskComplete: id => {
		set(state => ({
			tasks: state.tasks.map(task =>
				task.id === id
					? {
							...task,
							completedAt: task.completedAt ? undefined : new Date(),
						}
					: task
			),
		}));
	},
}));
