<script lang="ts">
  import { page } from '$app/stores';
  import VideoCard from '$lib/components/VideoCard.svelte';
  import type { Video } from '$lib/types';

  const { data }: { data: { videos: Video[] } } = $props();

  const tags = $derived(['All', ...new Set(data.videos.flatMap((v: Video) => v.tags ?? []))]);
  let activeTag = $state('All');

  let searchQuery = $derived($page.url.searchParams.get('search')?.toLowerCase() ?? '');

  let filtered = $derived(
    data.videos
      .filter((v: Video) =>
        searchQuery === '' ||
        v.title?.toLowerCase().includes(searchQuery) ||
        v.description?.toLowerCase().includes(searchQuery) ||
        v.tags?.some(t => t.toLowerCase().includes(searchQuery))
      )
      .filter((v: Video) =>
        activeTag === 'All' || v.tags?.includes(activeTag)
      )
  );
</script>

<div class="chip-row">
  {#each tags as tag}
    <button
      class="chip"
      class:active={activeTag === tag}
      onclick={() => (activeTag = tag)}
    >
      {tag.charAt(0).toUpperCase() + tag.slice(1)}
    </button>
  {/each}
</div>

{#if filtered.length === 0}
  <p class="empty">No videos found.</p>
{:else}
  <div class="grid">
    {#each filtered as video (video.id)}
      <VideoCard {video} />
    {/each}
  </div>
{/if}

<style>
  .chip-row {
  display: flex; gap: 8px; padding: 12px 20px;
  overflow-x: auto; scrollbar-width: none;
  border-bottom: 0.5px solid var(--border);
  position: sticky; top: 56px; z-index: 40;
  background: var(--nav-bg);
  backdrop-filter: blur(8px);
  justify-content: center;
}

.chip {
  flex-shrink: 0; padding: 5px 14px; border-radius: 8px;
  font-size: 13px; font-weight: 500; cursor: pointer;
  border: none; transition: background 0.15s, color 0.15s;
  background: var(--chip-bg); color: var(--chip-color);
}
.chip:hover { background: var(--chip-hover-bg); color: var(--text); }
.chip.active { background: var(--chip-active-bg); color: var(--chip-active-color); }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 360px));
    gap: 20px;
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    justify-content: center;
  }

  .empty {
    padding: 80px 20px; text-align: center;
    color: rgba(255,255,255,0.3); font-size: 15px;
  }

  @media (max-width: 600px) {
    .grid { grid-template-columns: 1fr; gap: 12px; padding: 12px; }
  }
</style>