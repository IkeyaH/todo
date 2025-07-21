import { Link } from '@tanstack/react-router';
import { cn } from '../../lib/utils';
import { useNavbarStore } from '../../stores/navbarStore';
import { useProjectStore } from '../../stores/projectStore';
import { NavbarToggleButton } from '../NavbarToggleButton/NavbarToggleButton';

export const Navbar = () => {
	const { isNavbarOpen } = useNavbarStore();
	const { projects } = useProjectStore();

	return (
		// TODO: レスポンシブ設定
		<nav
			aria-label="Main navigation"
			aria-hidden={!isNavbarOpen}
			className={cn(
				'border-r border-gray-300 bg-gray-100 p-4 transition-all duration-300 ease-in-out',
				isNavbarOpen ? 'w-64' : 'w-0 overflow-hidden p-0'
			)}
		>
			<div className="flex flex-col space-y-4">
				<div className="flex justify-between">
					<div className="font-bold">TODO</div>
					<NavbarToggleButton />
				</div>
				<Link
					to="/"
					className="font-bold text-gray-800 transition-colors hover:text-blue-600"
				>
					Home
				</Link>

				{/* プロジェクトリンク */}
				<div className="mt-4">
					<div className="mb-2 text-sm font-semibold text-gray-600">
						Projects
					</div>
					{projects.map(project => (
						<Link
							key={project.id}
							to="/projects/$projectId"
							params={{ projectId: project.id }}
							className="block py-1 font-medium text-gray-700 transition-colors hover:text-blue-600"
						>
							{project.title}
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
};
