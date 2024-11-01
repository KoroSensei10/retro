import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '.';
import { userStore } from '../../stores/auth/index.svelte';

const loginWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		userStore.user = userCredential.user;
	} catch (error) {
		console.error('Error signing in:', error);
	}
};

export const disconnect = () => {
	userStore.user = null;
};

export default loginWithEmailAndPassword;
