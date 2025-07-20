import { Link } from '@tanstack/react-router';

export const Navbar = () => {
	return (
		<nav className="w-64 border-r border-gray-300 bg-gray-100 p-4">
			<div className="flex flex-col space-y-4">
				<Link
					to="/"
					className="font-bold text-gray-800 transition-colors hover:text-blue-600"
				>
					Home
				</Link>
				<Link
					to="/about"
					className="font-bold text-gray-800 transition-colors hover:text-blue-600"
				>
					About
				</Link>
			</div>
		</nav>
	);
};
