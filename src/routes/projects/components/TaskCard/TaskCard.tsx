import { useState } from 'react';
import type { Task } from '../../../../types/task';

type TaskCardProps = {
	task: Task;
	onToggleComplete: (taskId: string) => void;
};

export function TaskCard({ task, onToggleComplete }: TaskCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);
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
			className={`max-w-md border-b border-gray-200 p-1 ${
				isCompleted ? 'bg-gray-50' : 'bg-white'
			}`}
		>
			<div className="flex items-center gap-3">
				<input
					type="checkbox"
					checked={isCompleted}
					onChange={() => {
						onToggleComplete(task.id);
					}}
					className="h-3.5 w-3.5 rounded border-gray-300 text-green-600 focus:ring-green-500"
				/>
				<div className="flex-1">
					<div className="flex items-center justify-between">
						<div className="min-w-0 flex-1">
							<h3
								className={`font-medium break-words ${
									isCompleted ? 'text-gray-600 line-through' : 'text-gray-800'
								}`}
							>
								{task.title}
							</h3>
							<div
								className={`mt-1 flex gap-4 text-xs ${
									isCompleted ? 'text-gray-400' : 'text-gray-500'
								}`}
							>
								{task.dueDate && (
									<span className={isCompleted ? '' : 'text-orange-600'}>
										期限: {formatDate(task.dueDate)}
									</span>
								)}
							</div>
						</div>
						{task.description && (
							<button
								type="button"
								onClick={() => {
									setIsExpanded(!isExpanded);
								}}
								className="ml-2 text-gray-400 transition-colors hover:text-gray-600"
							>
								<svg
									className={`h-4 w-4 transition-transform ${
										isExpanded ? 'rotate-180' : ''
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
						)}
					</div>
					{task.description && (
						<div
							className={`overflow-hidden transition-all duration-300 ease-in-out ${
								isExpanded ? 'max-h-96' : 'max-h-0'
							}`}
						>
							<p
								className={`mt-2 text-sm break-words ${
									isCompleted ? 'text-gray-500' : 'text-gray-600'
								}`}
							>
								{task.description}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
