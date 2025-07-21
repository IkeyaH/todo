import { useState } from 'react';
import type { Task } from '../../../../types/task';
import { CreateTaskCard } from '../../../../components/CreateTaskCard/CreateTaskCard';
import { TaskCard } from '../TaskCard/TaskCard';
import { HiOutlinePlus } from 'react-icons/hi';
import { Button } from '../../../../components';

type TaskListProps = {
	title: string;
	tasks: Task[];
	projectId: string;
	onToggleComplete: (taskId: string) => void;
	emptyMessage: string;
};

export function TaskList({
	title,
	tasks,
	projectId,
	onToggleComplete,
	emptyMessage,
}: TaskListProps) {
	const [isCreating, setIsCreating] = useState(false);

	const handleTaskCreated = () => {
		setIsCreating(false);
	};

	return (
		<div>
			<h2 className="mb-4 text-xl font-semibold text-gray-800">
				{title} ({tasks.length})
			</h2>
			{tasks.length === 0 && !isCreating ? (
				<p className="text-gray-500">{emptyMessage}</p>
			) : (
				<div>
					{tasks.map(task => (
						<TaskCard
							key={task.id}
							task={task}
							onToggleComplete={onToggleComplete}
						/>
					))}
				</div>
			)}
			{isCreating ? (
				<CreateTaskCard
					projectId={projectId}
					onTaskCreated={handleTaskCreated}
				/>
			) : (
				<Button
					variant="link"
					onClick={() => {
						setIsCreating(true);
					}}
					className="mt-4 flex items-center text-gray-600"
				>
					<HiOutlinePlus className="mr-2" />
					タスクを追加
				</Button>
			)}
		</div>
	);
}
