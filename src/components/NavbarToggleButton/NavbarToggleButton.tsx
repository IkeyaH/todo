import { VscLayoutSidebarLeftOff } from 'react-icons/vsc';
import { useNavbarStore } from '../../stores/navbarStore';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const NavbarToggleButton = ({ ...props }: Props) => {
	const { toggleNavbar } = useNavbarStore();

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
