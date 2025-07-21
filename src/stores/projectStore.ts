import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Project } from '../types';

type ProjectStore = {
	projects: Project[];
	addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
	updateProject: (
		id: string,
		updates: Partial<Omit<Project, 'id' | 'createdAt'>>
	) => void;
	deleteProject: (id: string) => void;
	setProjects: (projects: Project[]) => void;
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

export const useProjectStore = create<ProjectStore>()(
	persist(
		set => ({
			projects: [],
			addProject: project => {
				set(state => ({
					projects: [
						...state.projects,
						{
							...project,
							id: uuid(),
							createdAt: new Date(),
						},
					],
				}));
			},
			updateProject: (id, updates) => {
				set(state => ({
					projects: state.projects.map(project =>
						project.id === id ? { ...project, ...updates } : project
					),
				}));
			},
			deleteProject: id => {
				set(state => ({
					projects: state.projects.filter(project => project.id !== id),
				}));
			},
			setProjects: projects => {
				set({ projects });
			},
		}),
		{
			name: 'project-storage',
			storage: createJSONStorage(() => localStorage, { reviver: dateReviver }),
		}
	)
);
