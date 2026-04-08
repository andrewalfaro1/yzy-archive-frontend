<script lang="ts">
	import type { Video } from '$lib/types';
	import VideoCard from './VideoCard.svelte';

	let { videos }: { videos: Video[] } = $props();
</script>

<div class="video-grid">
	{#each videos as video}
		<VideoCard {video} />
	{/each}
</div>

<style>
	.video-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.25rem;
	}
</style>
