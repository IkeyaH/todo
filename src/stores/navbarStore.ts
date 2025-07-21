import { create } from 'zustand';

interface NavbarState {
	isNavbarOpen: boolean;
	toggleNavbar: () => void;
}

// TODO: マジックナンバー解消
export const useNavbarStore = create<NavbarState>(set => ({
	isNavbarOpen: window.innerWidth >= 1024,
	toggleNavbar: () => {
		set(state => ({ isNavbarOpen: !state.isNavbarOpen }));
	},
}));
