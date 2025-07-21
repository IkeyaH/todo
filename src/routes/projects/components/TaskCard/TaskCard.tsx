import { useState } from 'react';
import type { Task } from '../../../../types/task';
import { Button } from '../../../../components';
import { useTaskStore } from '../../../../stores/taskStore';
import { HiOutlineChevronDown } from 'react-icons/hi';

type TaskCardProps = {
	task: Task;
	onToggleComplete: (taskId: string) => void;
};

export function TaskCard({ task, onToggleComplete }: TaskCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const deleteTask = useTaskStore(state => state.deleteTask);

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
			className={`group w-full border-b border-gray-200 p-1 ${
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
						<div className="flex items-center">
							<div className={`transition-opacity duration-200`}>
								<Button
									variant="danger-link"
									size="sm"
									onClick={() => {
										deleteTask(task.id);
									}}
									className="ml-2"
								>
									削除
								</Button>
							</div>
							<div className="min-w-10">
								{task.description && (
									<button
										type="button"
										onClick={() => {
											setIsExpanded(!isExpanded);
										}}
										className="ml-2 pr-2 text-gray-400 transition-colors hover:text-gray-600"
									>
										<HiOutlineChevronDown
											className={`h-4 w-4 transition-transform ${
												isExpanded ? 'rotate-180' : ''
											}`}
										/>
									</button>
								)}
							</div>
						</div>
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
