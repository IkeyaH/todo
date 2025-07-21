import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = {
	size?: 'sm' | 'md' | 'lg';
	variant?: 'default' | 'link' | 'danger' | 'danger-link';
	className?: string;
	children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const sizeClass = {
	sm: 'px-2 py-1 text-xs',
	md: 'px-3 py-1.5 text-sm',
	lg: 'px-4 py-2 text-base',
};

const variantClass = {
	default: 'bg-blue-500 text-white hover:bg-blue-600 border border-blue-500',
	link: 'bg-transparent text-blue-600 underline hover:text-blue-800 border-none',
	danger: 'bg-red-500 text-white hover:bg-red-600 border border-red-500',
	'danger-link':
		'bg-transparent text-red-600 underline hover:text-red-800 border-none',
};

export function Button({
	size = 'md',
	variant = 'default',
	className = '',
	children,
	...props
}: ButtonProps) {
	return (
		<button
			className={`rounded transition ${sizeClass[size]} ${variantClass[variant]} ${className}`}
			{...props}
			type="button"
		>
			{children}
		</button>
	);
}
