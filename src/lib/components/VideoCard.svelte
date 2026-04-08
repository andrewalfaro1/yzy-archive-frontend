<script lang="ts">
  import { formatViews, formatDate, formatDuration } from '$lib/utils/format';

  const { video } = $props();

  const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL ?? 'http://localhost:8055';

  const thumbnailUrl = video.thumbnail?.id
    ? `${DIRECTUS_URL}/assets/${video.thumbnail.id}?width=640&height=360&format=webp&fit=cover`
    : null;
</script>

<a href="/video/{video.id}" class="card">
  <div class="thumb">
    {#if thumbnailUrl}
      <img src={thumbnailUrl} alt={video.title} loading="lazy" decoding="async" />
    {:else}
      <div class="thumb-placeholder">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
          <polygon points="10,8 10,16 17,12" fill="rgba(255,255,255,0.3)"/>
        </svg>
      </div>
    {/if}

    {#if video.duration}
      <span class="duration">{formatDuration(video.duration)}</span>
    {/if}

    <div class="thumb-overlay">
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="rgba(62,166,255,0.85)"/>
        <polygon points="10,7 10,17 18,12" fill="#fff"/>
      </svg>
    </div>
  </div>

  <div class="meta">
    <div class="info">
      <p class="title">{video.title}</p>
      <p class="sub">
        {#if video.views != null}{formatViews(video.views)} views{/if}
        {#if video.upload_date} · {formatDate(video.upload_date)}{/if}
      </p>
    </div>
  </div>
</a>

<style>
  .card {
    display: block;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.15s;
  }
  .card:hover { transform: translateY(-2px); }
  .card:hover .thumb-overlay { opacity: 1; }
  .card:hover img { filter: brightness(0.85); }

  .thumb {
    position: relative; width: 100%; aspect-ratio: 16/9;
    background: #1a1a1a; border-radius: 10px; overflow: hidden;
  }
  .thumb img {
    width: 100%; height: 100%; object-fit: cover;
    transition: filter 0.2s;
    display: block;
  }
  .thumb-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: #1e1e1e;
  }
  .thumb-placeholder svg { width: 48px; height: 48px; }

  .thumb-overlay {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.2s;
    background: rgba(0,0,0,0.2);
  }
  .thumb-overlay svg { width: 48px; height: 48px; }

  .duration {
    position: absolute; bottom: 7px; right: 7px;
    background: rgba(0,0,0,0.85); color: #fff;
    font-size: 11px; font-weight: 600;
    padding: 2px 6px; border-radius: 4px;
    letter-spacing: 0.2px;
  }

  .meta {
    display: flex; gap: 10px; align-items: flex-start;
    padding: 10px 2px 4px;
  }
  .info { flex: 1; min-width: 0; }
  .title {
  font-size: 13px; font-weight: 500; line-height: 1.35;
  color: var(--text);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; margin-bottom: 4px;
}
.sub { font-size: 12px; color: var(--text-muted); line-height: 1.4; }
</style>