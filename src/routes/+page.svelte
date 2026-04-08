<script lang="ts">
	import VideoGrid from '$lib/components/VideoGrid.svelte';
	import type { Video } from '$lib/types';

	let { data }: { data: { videos: Video[] } } = $props();
</script>

<section class="hero">
	<h1>Latest Videos</h1>
	<p>Gallary & Archive of Ye (Artist formerly Known As Kanye West).</p>
</section>

{#if data.videos.length === 0}
	<p>No videos found.</p>
{:else}
	<VideoGrid videos={data.videos} />
{/if}

<style>
	.hero {
		margin-bottom: 1.5rem;
	}

	h1 {
		margin: 0 0 0.35rem;
		font-size: 2rem;
		letter-spacing: -0.03em;
	}

	p {
		margin: 0;
		color: var(--muted);
	}
</style>
