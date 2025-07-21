import {
	RouterProvider,
	createMemoryHistory,
	createRootRoute,
	createRoute,
	createRouter,
	useRouterState,
} from '@tanstack/react-router';
import React, { type ReactNode, createContext, use } from 'react';

function RenderStory() {
	const storyFn = use(CurrentStoryContext);
	if (!storyFn) {
		throw new Error('Storybook root not found');
	}
	return storyFn();
}

export const CurrentStoryContext = createContext<(() => ReactNode) | undefined>(
	undefined
);

function NotFoundComponent() {
	const state = useRouterState();
	return (
		<div>
			<i>Warning:</i> Simulated route not found for path{' '}
			<code>{state.location.href}</code>
		</div>
	);
}

const storyPath = '/__story__';
const storyRoute = createRoute({
	path: storyPath,
	getParentRoute: () => rootRoute,
	component: RenderStory,
});

const rootRoute = createRootRoute({
	notFoundComponent: NotFoundComponent,
});
rootRoute.addChildren([storyRoute]);

export const storyRouter = createRouter({
	history: createMemoryHistory({ initialEntries: [storyPath] }),
	routeTree: rootRoute,
});

/** StoryBook用ダミーRouterDecorator */
export function storyRouterDecorator(storyFn: () => ReactNode) {
	return (
		<CurrentStoryContext value={storyFn}>
			<RouterProvider router={storyRouter} />
		</CurrentStoryContext>
	);
}
