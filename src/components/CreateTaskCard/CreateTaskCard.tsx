import { useState } from 'react';
import { useTaskStore } from '../../stores/taskStore';

type CreateTaskCardProps = {
	projectId: string;
	onTaskCreated?: () => void;
};

export const CreateTaskCard = ({
	projectId,
	onTaskCreated,
}: CreateTaskCardProps) => {
	const [title, setTitle] = useState('');
	const addTask = useTaskStore(state => state.addTask);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!title.trim()) return;

		addTask({
			projectId,
			title: title.trim(),
		});
		setTitle('');
		onTaskCreated?.();
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={title}
				onChange={e => {
					setTitle(e.target.value);
				}}
				placeholder="Add a new task"
			/>
			<button type="submit">Add Task</button>
		</form>
	);
};
