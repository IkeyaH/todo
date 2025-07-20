import { VscLayoutSidebarLeftOff } from 'react-icons/vsc';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	toggleNavbar: () => void;
}

export const NavbarToggleButton = ({ toggleNavbar, ...props }: Props) => {
	return (
		<button
			onClick={toggleNavbar}
			type="button"
			className="w-fit cursor-pointer rounded p-1 transition-colors hover:bg-gray-300"
			{...props}
		>
			<VscLayoutSidebarLeftOff />
		</button>
	);
};
