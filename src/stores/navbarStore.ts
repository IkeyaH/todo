import { create } from 'zustand';

type NavbarState = {
	isNavbarOpen: boolean;
	toggleNavbar: () => void;
};

export const useNavbarStore = create<NavbarState>(set => ({
	isNavbarOpen: true,
	toggleNavbar: () => {
		set(state => ({ isNavbarOpen: !state.isNavbarOpen }));
	},
}));
