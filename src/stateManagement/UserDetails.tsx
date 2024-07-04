import { create } from "zustand";

type Users = {
	name: string;
	email: string;
	password: string;
};

type UserLogin = {
	email: string;
	password: string;
};

interface UserProps {
	user: Users;
	userLogin: UserLogin;

	userDetails: {
		name: string;
		email: string;
	};

	setUserName: (username: string) => void;
	setUserEmail: (email: string) => void;
	setUserPassword: (password: string) => void;

	setUserLoginEmail: (email: string) => void;
	setUserLoginPassword: (password: string) => void;

	// setUserLogin: (email: string, password: string) => void;
	clearUserInput: () => void;
	clearUserDetails: () => void;
}

const UserDetails = create<UserProps>((set) => ({
	user: {
		name: "",
		email: "",
		password: "",
	},

	userLogin: {
		email: "",
		password: "",
	},

	userDetails: {
		name: "",
		email: "",
	},

	// To set the details to send as post request during Register
	setUserName: (username) => set((store) => ({ user: { ...store.user, name: username } })),
	setUserEmail: (email) => set((store) => ({ user: { ...store.user, email: email } })),
	setUserPassword: (password) => set((store) => ({ user: { ...store.user, password: password } })),

	// To set the details to send as post request during login
	setUserLoginEmail: (email) => set((store) => ({ userLogin: { ...store.userLogin, email: email } })),
	setUserLoginPassword: (password) => set((store) => ({ userLogin: { ...store.userLogin, password: password } })),

	// To clear the details when logged in
	clearUserInput: () => set(() => ({ user: { name: "", password: "", email: "" } })),

	// To clear the details when logged out
	clearUserDetails: () => set(() => ({ userDetails: { name: "", email: "" } })),
}));

export default UserDetails;
