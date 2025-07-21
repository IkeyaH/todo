import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Navbar, NavbarToggleButton } from '../components';
import { useNavbarStore } from '../stores/navbarStore';

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const { isNavbarOpen } = useNavbarStore();

	return (
		<div className="flex h-screen">
			<Navbar />
			<main className="flex-1 p-4">
				{!isNavbarOpen && (
					<div className="mb-4">
						<NavbarToggleButton />
					</div>
				)}
				<Outlet />
			</main>
			<TanStackRouterDevtools position="bottom-right" />
		</div>
	);
}
