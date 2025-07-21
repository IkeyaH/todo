import { faker } from '@faker-js/faker';
import type { Project } from '../types/project';

export const createMockProject = (
	overrides: Partial<Project> = {}
): Project => ({
	id: faker.string.uuid(),
	title: faker.company.name() + 'プロジェクト',
	description: faker.datatype.boolean({ probability: 0.9 })
		? faker.lorem.sentences(2)
		: undefined, // 90%の確率で説明あり
	createdAt: faker.date.recent({ days: 90 }), // 過去90日以内
	...overrides,
});

// 固定のモックプロジェクトリスト（ストアで使用）
export const createMockProjectList = (count: number): Project[] => {
	return Array.from({ length: count }, () => createMockProject());
};

// デフォルトのモックプロジェクトリスト
export const mockProjects: Project[] = [
	createMockProject({
		id: '1',
		title: 'Webアプリケーション開発',
		description:
			'新しいWebアプリケーションの設計・開発・テストを行うプロジェクト',
		createdAt: new Date('2025-01-15'),
	}),
	createMockProject({
		id: '2',
		title: 'モバイルアプリのリニューアル',
		description:
			'既存のモバイルアプリケーションのUI/UXを改善し、新機能を追加する',
		createdAt: new Date('2025-02-01'),
	}),
	createMockProject({
		id: '3',
		title: 'データ分析プラットフォーム',
		description: 'ビッグデータを活用した分析プラットフォームの構築',
		createdAt: new Date('2025-03-10'),
	}),
];
