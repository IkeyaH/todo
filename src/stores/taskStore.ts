import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import type { Task } from '../types';
import { mockTasks } from '../mocks';

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
	tasks: mockTasks,
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
