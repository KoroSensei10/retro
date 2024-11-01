import { db } from '$lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import type { Page } from '../../types';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, url }) => {
	let slug = params.slug;
	if (!slug) {
		const pathSegments = url.pathname.split('/');
		slug = pathSegments[pathSegments.length - 1] || '';
	}

	const q = query(collection(db, 'pages'), where('slug', '==', slug));
	const querySnapshot = await getDocs(q);
	const page: Page | null = querySnapshot.docs.map((doc) => doc.data())[0] as Page | null;

	return {
		slug,
		pageContent: page
	};
};
