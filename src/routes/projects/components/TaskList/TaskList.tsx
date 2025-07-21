import type { Task } from '../../../../types/task';
import { TaskCard } from '../TaskCard/TaskCard';

type TaskListProps = {
	title: string;
	tasks: Task[];
	onToggleComplete: (taskId: string) => void;
	emptyMessage: string;
};

export function TaskList({
	title,
	tasks,
	onToggleComplete,
	emptyMessage,
}: TaskListProps) {
	return (
		<div>
			<h2 className="mb-4 text-xl font-semibold text-gray-800">
				{title} ({tasks.length})
			</h2>
			{tasks.length === 0 ? (
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
		</div>
	);
}
