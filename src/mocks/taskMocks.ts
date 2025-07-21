import { faker } from '@faker-js/faker';
import type { Task } from '../types/task';

export const createMockTask = (overrides: Partial<Task> = {}): Task => {
	const createdAt = faker.date.recent({ days: 30 }); // 過去30日以内
	const hasDueDate = faker.datatype.boolean();
	const isCompleted = faker.datatype.boolean({ probability: 0.3 }); // 30%の確率で完了済み

	return {
		id: faker.string.uuid(),
		projectId: faker.string.uuid(),
		title: faker.lorem.sentence(3).replace('.', ''),
		description: faker.datatype.boolean({ probability: 0.8 })
			? faker.lorem.sentences(2)
			: undefined, // 80%の確率で説明あり
		dueDate: hasDueDate
			? faker.date.between({ from: createdAt, to: faker.date.future() })
			: undefined,
		completedAt: isCompleted
			? faker.date.between({ from: createdAt, to: new Date() })
			: undefined,
		createdAt,
		...overrides,
	};
};

// 固定のモックタスクリスト（Storybookなどで一貫性が必要な場合）
export const createMockTaskList = (
	count: number,
	projectId?: string
): Task[] => {
	return Array.from({ length: count }, () =>
		createMockTask(projectId ? { projectId } : {})
	);
};

// 特定のパターンのタスクを作成するヘルパー関数
export const createCompletedTask = (overrides: Partial<Task> = {}): Task => {
	const createdAt = faker.date.recent({ days: 30 });
	const maxCompletedDate = new Date();

	// completedAtはcreatedAtより後の日付にする
	const completedAt =
		createdAt < maxCompletedDate
			? faker.date.between({ from: createdAt, to: maxCompletedDate })
			: faker.date.future({ refDate: createdAt });

	return createMockTask({
		completedAt,
		createdAt,
		...overrides,
	});
};

export const createIncompleteTask = (overrides: Partial<Task> = {}): Task => {
	return createMockTask({
		completedAt: undefined,
		...overrides,
	});
};

export const createTaskWithoutDescription = (
	overrides: Partial<Task> = {}
): Task => {
	return createMockTask({
		description: undefined,
		...overrides,
	});
};

export const createOverdueTask = (overrides: Partial<Task> = {}): Task => {
	const createdAt = faker.date.recent({ days: 30 });
	// 作成日より前の期限日を生成（期限切れにするため）
	const pastDate = faker.date.between({
		from: faker.date.past({ years: 1 }),
		to: createdAt,
	});
	return createMockTask({
		dueDate: pastDate, // 期限切れ
		completedAt: undefined,
		createdAt,
		...overrides,
	});
};

// Storybookで使用する固定のサンプルタスク
export const mockCompletedTask: Task = createCompletedTask({
	id: 'completed-1',
	projectId: '1',
	title: '完了済みタスクのサンプル',
	description: 'これは完了済みのタスクです',
});

export const mockIncompleteTask: Task = createIncompleteTask({
	id: 'incomplete-1',
	projectId: '1',
	title: '未完了タスクのサンプル',
	description: 'これは未完了のタスクです',
});

export const mockTaskWithoutDescription: Task = createTaskWithoutDescription({
	id: 'no-desc-1',
	projectId: '1',
	title: '説明なしタスクのサンプル',
});

export const mockOverdueTask: Task = createOverdueTask({
	id: 'overdue-1',
	projectId: '1',
	title: '期限切れタスクのサンプル',
	description: '期限が過ぎているタスクです',
});

// デフォルトのモックタスクリスト（ストアで使用）
export const mockTasks: Task[] = [
	...createMockTaskList(3, '1').map(task => ({
		...task,
		completedAt: undefined,
	})),
	...createMockTaskList(2, '1').map(task => {
		// completedAtは必ずcreatedAtより後の日付にする
		const maxCompletedDate = new Date();
		const completedAt =
			task.createdAt < maxCompletedDate
				? faker.date.between({ from: task.createdAt, to: maxCompletedDate })
				: faker.date.future({ refDate: task.createdAt });

		return {
			...task,
			completedAt,
		};
	}),
	...createMockTaskList(2, '2'),
];
