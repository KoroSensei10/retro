import { type User } from 'firebase/auth';

const getUserStore = () => {
	let user: User | null = $state(null);

	return {
		get user() {
			return user;
		},
		set user(value: User | null) {
			user = value;
		}
	};
};

export const userStore = getUserStore();
