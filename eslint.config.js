// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config(
	[
		globalIgnores(['dist']),
		{
			files: ['**/*.{ts,tsx}'],
			ignores: ['.storybook/**/*', '**/*.d.ts'], // Storybookファイルを除外
			extends: [
				js.configs.recommended,
				tseslint.configs.recommended,
				reactHooks.configs['recommended-latest'],
				reactRefresh.configs.vite,
				...tseslint.configs.strictTypeChecked,
				...tseslint.configs.stylisticTypeChecked,
				reactX.configs['recommended-typescript'],
				reactDom.configs.recommended,
			],
			languageOptions: {
				ecmaVersion: 2020,
				globals: globals.browser,
				parserOptions: {
					project: ['./tsconfig.node.json', './tsconfig.app.json'],
					tsconfigRootDir: import.meta.dirname,
				},
			},
		},
		{
			// Storybookファイル専用の設定（型チェック無し）
			files: ['.storybook/**/*.{ts,tsx,js,jsx}'],
			extends: [
				js.configs.recommended,
				tseslint.configs.recommended,
				reactHooks.configs['recommended-latest'],
			],
			languageOptions: {
				ecmaVersion: 2020,
				globals: globals.browser,
				parserOptions: {
					project: false, // 型チェックを無効化
					tsconfigRootDir: import.meta.dirname,
				},
			},
		},
	],
	storybook.configs['flat/recommended']
);
