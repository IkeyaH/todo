import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { NavbarToggleButton } from './NavbarToggleButton';

export const Navbar = () => {
	const [isNavbarOpen, setIsNavbarOpen] = useState(() => {
		return window.innerWidth >= 1024; // todo: マジックナンバー解消
	});

	const toggleNavbar = () => {
		setIsNavbarOpen(!isNavbarOpen);
	};

	return (
		<nav
			className={cn(
				'border-r border-gray-300 bg-gray-100 p-4 transition-all duration-300 ease-in-out',
				isNavbarOpen ? 'w-64' : 'w-16'
			)}
		>
			<div className="flex flex-col space-y-4">
				<div className="flex justify-between">
					<div className="font-bold">TODO</div>
					<NavbarToggleButton toggleNavbar={toggleNavbar}></NavbarToggleButton>
				</div>
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
