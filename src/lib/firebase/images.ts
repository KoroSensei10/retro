import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { storage } from '.';
import type { Image } from '../../types';

export async function uploadFile(file: File, path: string): Promise<string> {
	const storageRef = ref(storage, path);

	try {
		const snapshot = await uploadBytes(storageRef, file);
		const downloadURL = await getDownloadURL(snapshot.ref);
		return downloadURL;
	} catch (error) {
		console.error("Erreur d'upload :", error);
		throw error;
	}
}

export async function getAllImages(folderPath = 'images'): Promise<Image[]> {
	const folderRef = ref(storage, folderPath);

	try {
		const result = await listAll(folderRef);
		const images = await Promise.all(
			result.items.map(async (itemRef) => {
				const url = await getDownloadURL(itemRef);
				return { name: itemRef.name, url } satisfies Image;
			})
		);
		return images;
	} catch (error) {
		console.error('Erreur lors de la récupération des images :', error);
		throw error;
	}
}
