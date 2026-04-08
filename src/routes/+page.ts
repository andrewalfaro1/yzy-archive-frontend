import { getVideos } from '$lib/services';
import type { Video } from '$lib/types';

export async function load(): Promise<{ videos: Video[] }> {
	const videos = await getVideos();
	return { videos };
}
