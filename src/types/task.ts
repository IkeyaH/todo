export type Task = {
	id: string;
	projectId: string; // どのプロジェクトに属するか
	title: string; // タスクタイトル
	description?: string; // タスクの詳細・メモ
	dueDate?: Date; // 期日
	completedAt?: Date; // 完了日時
	createdAt: Date; // 作成日時
};
