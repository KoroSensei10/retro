import {
	isSignInWithEmailLink,
	sendSignInLinkToEmail,
	signInWithEmailLink,
	type ActionCodeSettings
} from 'firebase/auth';
import { auth } from '.';

export const actionCodeSettings: ActionCodeSettings = {
	url: 'https://wiki.lok2.fr/complete-sign-in',
	// This must be true.
	handleCodeInApp: true
};

export const sendMagicLink = async (email: string) => {
	const actionCodeSettings = {
		url: `${window.location.origin}/complete-sign-in`,
		handleCodeInApp: true
	};

	try {
		await sendSignInLinkToEmail(auth, email, actionCodeSettings);
		window.localStorage.setItem('emailForSignIn', email);
		alert('Check your email for the magic link!');
	} catch (error) {
		console.error('Error sending magic link:', error);
	}
};

export const completeMagicLinkSignIn = async () => {
	const email = window.localStorage.getItem('emailForSignIn');
	if (!email || !isSignInWithEmailLink(auth, window.location.href)) return null;

	try {
		const result = await signInWithEmailLink(auth, email, window.location.href);
		window.localStorage.removeItem('emailForSignIn');
		console.log('result', result);

		return result.user;
	} catch (error) {
		console.error('Error completing sign-in:', error);
		return null;
	}
};
