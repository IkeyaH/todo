// .storybook/preview.ts
import type { Preview } from '@storybook/react';
import { storyRouterDecorator } from './StoryRouterDecorator';
import '../src/index.css'; // Tailwind CSSなどのスタイルもここでインポート

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [storyRouterDecorator],
};

export default preview;
