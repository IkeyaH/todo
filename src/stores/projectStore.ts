import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import type { Project } from '../types';
import { mockProjects } from '../mocks';

type ProjectStore = {
	projects: Project[];
	addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
	updateProject: (
		id: string,
		updates: Partial<Omit<Project, 'id' | 'createdAt'>>
	) => void;
	deleteProject: (id: string) => void;
};

export const useProjectStore = create<ProjectStore>(set => ({
	projects: mockProjects,
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
}));
