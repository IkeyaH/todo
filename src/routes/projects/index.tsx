import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects/')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/projects/"!</div>;
}
