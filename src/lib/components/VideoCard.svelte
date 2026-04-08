<script lang="ts">
	import type { Video } from '$lib/types';

	let { video }: { video: Video } = $props();
	const baseUrl = import.meta.env.VITE_DIRECTUS_URL;
</script>

<a href={`/video/${video.id}`} class="video-card">
	<div class="thumb-wrap">
		{#if video.thumbnail?.id}
			<img
				src={`${baseUrl}/assets/${video.thumbnail.id}?width=640&format=webp`}
				alt={video.title}
				class="thumbnail"
			/>
		{:else}
			<div class="thumbnail placeholder">No thumbnail</div>
		{/if}
	</div>

	<div class="content">
		<h2>{video.title}</h2>
		<p class="meta">
			{video.views ?? 0} views
			<span class="dot">•</span>
			{new Date(video.upload_date).toLocaleDateString()}
		</p>
	</div>
</a>

<style>
	.video-card {
		display: block;
		border-radius: 16px;
		overflow: hidden;
		background: var(--panel);
		border: 1px solid var(--border);
		transition:
			transform 0.18s ease,
			background 0.18s ease,
			border-color 0.18s ease;
	}

	.video-card:hover {
		transform: translateY(-3px);
		background: var(--panel-hover);
		border-color: #3a3a44;
	}

	.thumb-wrap {
		aspect-ratio: 16 / 9;
		background: #111;
		overflow: hidden;
	}

	.thumbnail {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.placeholder {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		color: var(--muted);
		background: #16161a;
	}

	.content {
		padding: 0.9rem 1rem 1rem;
	}

	h2 {
		margin: 0 0 0.45rem;
		font-size: 1rem;
		line-height: 1.35;
		font-weight: 700;
	}

	.meta {
		margin: 0;
		font-size: 0.875rem;
		color: var(--muted);
	}

	.dot {
		margin: 0 0.4rem;
	}
</style>
