import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDtXh6Ti1vuyJjKyERhXrcVmYo3LgJCQc8',
	authDomain: 'lok2-wiki.firebaseapp.com',
	projectId: 'lok2-wiki',
	storageBucket: 'lok2-wiki.appspot.com',
	messagingSenderId: '6086095321',
	appId: '1:6086095321:web:e6436210dbcfab0ce5e9c8'
};

const app = initializeApp(firebaseConfig, 'lok2-wiki');
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
