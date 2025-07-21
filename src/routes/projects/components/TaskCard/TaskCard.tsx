import type { Task } from '../../../../types/task';

type TaskCardProps = {
	task: Task;
	onToggleComplete: (taskId: string) => void;
};

export function TaskCard({ task, onToggleComplete }: TaskCardProps) {
	const formatDate = (date: Date) => {
		return date.toLocaleDateString('ja-JP', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const isCompleted = !!task.completedAt;

	return (
		<div
			className={`rounded-lg border border-gray-200 p-4 shadow-sm ${
				isCompleted ? 'bg-gray-50' : 'bg-white'
			}`}
		>
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<h3
						className={`font-medium ${
							isCompleted ? 'text-gray-600 line-through' : 'text-gray-800'
						}`}
					>
						{task.title}
					</h3>
					{task.description && (
						<p
							className={`mt-1 text-sm ${
								isCompleted ? 'text-gray-500' : 'text-gray-600'
							}`}
						>
							{task.description}
						</p>
					)}
					<div
						className={`mt-2 flex gap-4 text-xs ${
							isCompleted ? 'text-gray-400' : 'text-gray-500'
						}`}
					>
						<span>作成: {formatDate(task.createdAt)}</span>
						{task.dueDate && (
							<span className={isCompleted ? '' : 'text-orange-600'}>
								期限: {formatDate(task.dueDate)}
							</span>
						)}
						{task.completedAt && (
							<span className="text-green-600">
								完了: {formatDate(task.completedAt)}
							</span>
						)}
					</div>
				</div>
				<button
					type="button"
					onClick={() => {
						onToggleComplete(task.id);
					}}
					className={`ml-4 rounded px-3 py-1 text-xs text-white transition-colors ${
						isCompleted
							? 'bg-gray-500 hover:bg-gray-600'
							: 'bg-green-500 hover:bg-green-600'
					}`}
				>
					{isCompleted ? '未完了に戻す' : '完了'}
				</button>
			</div>
		</div>
	);
}
