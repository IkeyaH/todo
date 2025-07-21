import { create } from 'zustand';
import type { Project } from '../types';

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
	projects: [
		{
			id: '1',
			title: 'Project Alpha',
			description: 'This is the first project.',
			createdAt: new Date('2023-01-01'),
		},
		{
			id: '2',
			title: 'Project Beta',
			description: 'This is the second project.',
			createdAt: new Date('2023-02-01'),
		},
	],
	addProject: project => {
		set(state => ({
			projects: [
				...state.projects,
				{
					...project,
					id: Date.now().toString(), // 簡単なID生成（実際のプロジェクトではuuidなどを使用することを推奨）
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
