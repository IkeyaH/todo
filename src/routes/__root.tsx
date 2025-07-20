import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Navbar } from '../components';

export const Route = createRootRoute({
	component: () => (
		<div className="flex h-screen">
			<Navbar />
			<main className="flex-1 p-4">
				<Outlet />
			</main>
			<TanStackRouterDevtools position="bottom-right" />
		</div>
	),
});
