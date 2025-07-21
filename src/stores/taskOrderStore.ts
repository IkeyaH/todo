import { create } from 'zustand';

// projectIdごとにタスクIDの配列で並び順を管理
export type TaskOrderStore = {
	orderMap: Record<string, string[]>;
	setOrder: (projectId: string, order: string[]) => void;
	getOrder: (projectId: string) => string[] | undefined;
};

export const useTaskOrderStore = create<TaskOrderStore>((set, get) => ({
	orderMap: {},
	setOrder: (projectId, order) => {
		set(state => ({
			orderMap: {
				...state.orderMap,
				[projectId]: order,
			},
		}));
	},
	getOrder: projectId => {
		return get().orderMap[projectId];
	},
}));
