<script lang="ts">
  import { onMount } from 'svelte';
  import VideoPlayer from 'svelte-video-player';
  import type { Video } from '$lib/types';
  import { incrementViews } from '$lib/services';
  const { data }: { data: { video: Video } } = $props();
  const baseUrl = import.meta.env.VITE_DIRECTUS_URL;
  onMount(async () => {
    try {
      await incrementViews(data.video.id);
    } catch (err) {
      console.error('Failed to increment views:', err);
    }
    const recolor = () => {
      document.querySelectorAll('.player-wrap [style*="background-color"]').forEach(el => {
        (el as HTMLElement).style.backgroundColor = '#3ea6ffd9';
      });
    };
    recolor();
    setTimeout(recolor, 100);
    setTimeout(recolor, 500);
    const observer = new MutationObserver(recolor);
    const wrap = document.querySelector('.player-wrap');
    if (wrap) {
      observer.observe(wrap, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
    }
    return () => observer.disconnect();
  });
</script>

<div class="layout">
  <div class="main-col">
    <div class="player-wrap">
      {#if data.video.thumbnail?.id && data.video.video_file?.id}
        <VideoPlayer
          poster={`${baseUrl}/assets/${data.video.thumbnail.id}?width=1280&format=webp`}
          source={`${baseUrl}/assets/${data.video.video_file.id}`}
          controlsColor="#3ea6ffd9"
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
      {#if data.video.description}
        <p class="description">{data.video.description}</p>
      {/if}
      {#if (data.video.tags ?? []).length > 0}
        <div class="tags">
          {#each data.video.tags ?? [] as tag}
            <span class="tag tag-{tag}">{tag}</span>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .layout {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
  }
  .main-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .player-wrap {
    width: 100%;
    aspect-ratio: 16/9;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
  }
  .player-wrap :global(video) {
    width: 100%;
    height: 100%;
  }

  /* Hide all player UI until hover to prevent orange flash */
  .player-wrap :global(.controls),
  .player-wrap :global(.play-pause-button),
  .player-wrap :global(.center-play-button),
  .player-wrap :global(.play-button),
  .player-wrap :global(button),
  .player-wrap :global(.overlay) {
    opacity: 0;
    transition: opacity 0.15s;
  }
  .player-wrap:hover :global(.controls),
  .player-wrap:hover :global(.play-pause-button),
  .player-wrap:hover :global(.center-play-button),
  .player-wrap:hover :global(.play-button),
  .player-wrap:hover :global(button),
  .player-wrap:hover :global(.overlay),
  .player-wrap :global(.controls:focus-within) {
    opacity: 1;
  }

  .info-card {
    padding: 1.25rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  h1 {
    margin: 0;
    font-size: 1.4rem;
    line-height: 1.3;
    letter-spacing: -0.02em;
    color: var(--text);
  }
  .meta {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.9rem;
  }
  .description {
    margin: 0;
    color: var(--text-muted);
    line-height: 1.7;
    font-size: 0.95rem;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .tag {
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid transparent;
  }
  .tag-bully {
    background: #1a1a1a;
    color: #ffffff;
    border-color: #333;
  }
  .tag-donda {
    background: #f0e6d3;
    color: #6b4c2a;
    border-color: #d4b896;
  }
  .tag-ye2020 {
    background: #fde8e8;
    color: #c0392b;
    border-color: #f5a5a5;
  }
  .dot { margin: 0 0.4rem; }
</style>