import getDirectusClient from '$lib/directus';
import { readItems, readItem, updateItem } from '@directus/sdk';
import type { Video } from '$lib/types';

export async function getVideos(): Promise<Video[]> {
	const directus = getDirectusClient();
	const response = await directus.request(
		readItems('videos', {
			fields: ['*', { thumbnail: ['*'] }, { video_file: ['*'] }],
			sort: ['-upload_date'],
			limit: 20
		})
	);

	console.log('getVideos response:', response);
	return response as Video[];
}

export async function getVideo(id: string): Promise<Video> {
	const directus = getDirectusClient();
	const response = await directus.request(
		readItem('videos', id, {
			fields: ['*', { thumbnail: ['*'] }, { video_file: ['*'] }]
		})
	);
	return response as Video;
}

export async function incrementViews(id: string) {
	const directus = getDirectusClient();
	const video = await directus.request(readItem('videos', id));
	await directus.request(
		updateItem('videos', id, {
			views: parseInt(String(video.views || 0), 10) + 1
		})
	);
}
