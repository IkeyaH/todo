import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@chromatic-com/storybook',
		// '@storybook/addon-onboarding',
		// '@storybook/addon-links',
		// '@storybook/addon-essentials',
		// '@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	typescript: {
		check: false,
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: prop =>
				prop.parent ? !prop.parent.fileName.includes('node_modules') : true,
		},
	},
};

export default config;
