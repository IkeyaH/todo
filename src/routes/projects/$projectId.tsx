import { createFileRoute } from '@tanstack/react-router';
import { useProjectStore } from '../../stores/projectStore';
import { useTaskStore } from '../../stores/taskStore';
import { TaskList } from './components';

export const Route = createFileRoute('/projects/$projectId')({
	component: RouteComponent,
});

function RouteComponent() {
	// todo: ここでの型アサーションは、プロジェクトIDが必ず存在することを前提としています。
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	const { projectId } = Route.useParams() as { projectId: string };
	const { projects } = useProjectStore();
	const { getTasksByProjectId, toggleTaskComplete } = useTaskStore();

	const project = projects.find(p => p.id === projectId);
	const tasks = getTasksByProjectId(projectId);

	if (!project) {
		return (
			<div className="p-8">
				<h2 className="text-2xl font-bold text-red-600">
					プロジェクトが見つかりません
				</h2>
				<p className="mt-2 text-gray-600">
					ID: {projectId} のプロジェクトは存在しません。
				</p>
			</div>
		);
	}

	return (
		<div className="w-full p-8">
			{/* プロジェクト情報 */}
			<div className="mb-8">
				<h2 className="text-3xl font-bold text-gray-800">{project.title}</h2>
				<p className="mt-2 text-gray-600">{project.description}</p>
			</div>

			{/* タスク統計 */}
			{/* <div className="mb-6 flex gap-4">
				<div className="rounded-lg bg-blue-100 p-4">
					<div className="text-2xl font-bold text-blue-800">{tasks.length}</div>
					<div className="text-sm text-blue-600">総タスク数</div>
				</div>
				<div className="rounded-lg bg-green-100 p-4">
					<div className="text-2xl font-bold text-green-800">
						{completedTasks.length}
					</div>
					<div className="text-sm text-green-600">完了</div>
				</div>
				<div className="rounded-lg bg-orange-100 p-4">
					<div className="text-2xl font-bold text-orange-800">
						{incompleteTasks.length}
					</div>
					<div className="text-sm text-orange-600">未完了</div>
				</div>
			</div> */}

			{/* タスク */}
			<div className="mb-8">
				<TaskList
					title="タスク一覧"
					tasks={tasks}
					onToggleComplete={toggleTaskComplete}
					emptyMessage="未完了のタスクはありません。"
				/>
			</div>
		</div>
	);
}
