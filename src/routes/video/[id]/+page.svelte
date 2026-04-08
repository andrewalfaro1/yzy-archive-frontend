<script lang="ts">
	import { onMount } from 'svelte';
	import VideoPlayer from 'svelte-video-player';
	import type { Video } from '$lib/types';
	import { incrementViews } from '$lib/services';

	let { data }: { data: { video: Video } } = $props();
	const baseUrl = import.meta.env.VITE_DIRECTUS_URL;

	onMount(async () => {
		try {
			await incrementViews(data.video.id);
		} catch (err) {
			console.error('Failed to increment views:', err);
		}
	});
</script>

<div class="watch-page">
	<div class="player-wrap">
		{#if data.video.thumbnail?.id && data.video.video_file?.id}
			<VideoPlayer
				poster={`${baseUrl}/assets/${data.video.thumbnail.id}?width=1280&format=webp`}
				source={`${baseUrl}/assets/${data.video.video_file.id}`}
			/>
		{:else}
			<p>Missing thumbnail or video file.</p>
		{/if}
	</div>

	<div class="info-card">
		<h1>{data.video.title}</h1>
		<p class="meta">
			{data.video.views ?? 0} views
			<span class="dot">•</span>
			{new Date(data.video.upload_date).toLocaleDateString()}
		</p>

		<h2>Description</h2>
		<p class="description">{data.video.description}</p>

		{#if (data.video.tags ?? []).length > 0}
			<h2>Tags</h2>
			<div class="tags">
				{#each data.video.tags ?? [] as tag}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.watch-page {
		display: grid;
		gap: 1.25rem;
	}

	.player-wrap {
		overflow: hidden;
		border-radius: 18px;
		border: 1px solid var(--border);
		background: #000;
	}

	.info-card {
		padding: 1.25rem;
		background: var(--panel);
		border: 1px solid var(--border);
		border-radius: 18px;
	}

	h1 {
		margin: 0 0 0.5rem;
		font-size: 2rem;
		line-height: 1.15;
		letter-spacing: -0.03em;
	}

	h2 {
		margin: 1.25rem 0 0.5rem;
		font-size: 1rem;
	}

	.meta,
	.description {
		color: var(--muted);
	}

	.meta {
		margin: 0;
	}

	.description {
		margin: 0;
		line-height: 1.7;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		padding: 0.45rem 0.7rem;
		border-radius: 999px;
		background: #232329;
		color: #ddd;
		font-size: 0.875rem;
		border: 1px solid #30303a;
	}

	.dot {
		margin: 0 0.4rem;
	}
</style>
