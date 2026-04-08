import { getVideo } from '$lib/services';
import type { Video } from '$lib/types';

export async function load({ params }): Promise<{ video: Video }> {
	const video = await getVideo(params.id);
	return { video };
}
