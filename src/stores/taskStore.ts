import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { persist, createJSONStorage } from 'zustand/middleware';
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
	setTasks: (tasks: Task[]) => void;
};

const dateReviver = (_key: string, value: unknown) => {
	if (
		typeof value === 'string' &&
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
	) {
		return new Date(value);
	}
	return value;
};

export const useTaskStore = create<TaskStore>()(
	persist(
		(set, get) => ({
			tasks: [],
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
			setTasks: tasks => {
				set({ tasks });
			},
		}),
		{
			name: 'task-storage',
			storage: createJSONStorage(() => localStorage, { reviver: dateReviver }),
		}
	)
);
