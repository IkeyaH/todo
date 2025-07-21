import { useState } from 'react';
import { useTaskStore } from '../../stores/taskStore';
import { Button } from '../Button/Button';

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
				<Button
					type="button"
					variant="link"
					onClick={onTaskCreated}
					className="text-gray-600"
				>
					キャンセル
				</Button>
				<Button type="submit" variant="default">
					タスクを追加
				</Button>
			</div>
		</form>
	);
};
