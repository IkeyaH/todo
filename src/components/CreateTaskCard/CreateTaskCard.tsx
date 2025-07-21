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
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState('');
	const addTask = useTaskStore(state => state.addTask);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!title.trim()) return;

		addTask({
			projectId,
			title: title.trim(),
			description: description.trim() || undefined,
			dueDate: dueDate ? new Date(dueDate) : undefined,
		});

		setTitle('');
		setDescription('');
		setDueDate('');
		onTaskCreated?.();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 rounded-lg bg-white p-4 shadow"
		>
			<input
				type="text"
				value={title}
				onChange={e => {
					setTitle(e.target.value);
				}}
				placeholder="タスク名"
				className="w-full border-b border-b-gray-300 bg-transparent p-0.5 text-sm focus:border-blue-500 focus:outline-none"
				required
			/>
			<textarea
				value={description}
				onChange={e => {
					setDescription(e.target.value);
				}}
				placeholder="詳細"
				className="w-full resize-none border-b border-b-gray-300 bg-transparent p-0.5 text-sm focus:border-blue-500 focus:outline-none"
				rows={1}
			/>
			<input
				type="date"
				value={dueDate}
				onChange={e => {
					setDueDate(e.target.value);
				}}
				className="max-w-40 border-b border-b-gray-300 bg-transparent p-0.5 text-sm focus:border-blue-500 focus:outline-none"
			/>
			<div className="flex justify-end gap-2">
				<button
					type="button"
					onClick={onTaskCreated}
					className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100"
				>
					キャンセル
				</button>
				<button
					type="submit"
					className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				>
					タスクを追加
				</button>
			</div>
		</form>
	);
};
