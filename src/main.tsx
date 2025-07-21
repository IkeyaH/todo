import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { useProjectStore } from './stores/projectStore.ts';
import { useTaskStore } from './stores/taskStore.ts';
import { mockProjects } from './mocks/projectMocks.ts';
import { mockTasks } from './mocks/taskMocks.ts';

const initializeData = () => {
	const projectState = useProjectStore.getState();
	if (projectState.projects.length === 0) {
		projectState.setProjects(mockProjects);
	}
	const taskState = useTaskStore.getState();
	if (taskState.tasks.length === 0) {
		taskState.setTasks(mockTasks);
	}
};

initializeData();

const rootElement = document.getElementById('root');
if (!rootElement) {
	throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>
);
