<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  const { children } = $props();
  let searchQuery = $state('');
  let darkMode = $state(false);

  function handleSearch(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      if (searchQuery.trim()) {
        goto(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        goto('/');
      }
    }
  }
</script>

<div class="app-shell" class:dark={darkMode}>
  <header class="topnav">
    <a href="/" class="logo">YZY<span class="logo-dot">•</span>Vault</a>
    <div class="search-wrap">
      <svg class="search-icon" viewBox="0 0 16 16" fill="none">
        <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.3"/>
        <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
      </svg>
      <input
        type="search"
        placeholder="Search videos..."
        bind:value={searchQuery}
        onkeydown={handleSearch}
      />
    </div>
    <nav class="nav-links">
      <a href="/" class:active={$page.url.pathname === '/'}>Home</a>
      <button class="theme-toggle" onclick={() => (darkMode = !darkMode)}>
        {#if darkMode}
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.5"/>
            <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        {/if}
      </button>
    </nav>
  </header>
  <main>
    {@render children()}
  </main>
</div>

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }

  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  :global(a) { color: inherit; text-decoration: none; }

  /* Light mode tokens (default) */
  .app-shell {
    --bg: #f5f5f7;
    --surface: #ffffff;
    --nav-bg: rgba(245, 245, 247, 0.95);
    --border: rgba(0, 0, 0, 0.08);
    --text: #111111;
    --text-muted: #666666;
    --search-bg: rgba(0, 0, 0, 0.05);
    --search-border: rgba(0, 0, 0, 0.1);
    --search-focus-bg: rgba(0, 0, 0, 0.07);
    --search-focus-border: rgba(0, 0, 0, 0.2);
    --chip-bg: rgba(0, 0, 0, 0.07);
    --chip-color: #444;
    --chip-hover-bg: rgba(0, 0, 0, 0.12);
    --chip-active-bg: #111;
    --chip-active-color: #fff;
    --accent: #0071e3;

    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg);
    color: var(--text);
    transition: background 0.2s, color 0.2s;
  }

  /* Dark mode tokens */
  .app-shell.dark {
    --bg: #0f0f0f;
    --surface: #1a1a1a;
    --nav-bg: rgba(15, 15, 15, 0.95);
    --border: rgba(255, 255, 255, 0.08);
    --text: rgba(255, 255, 255, 0.9);
    --text-muted: rgba(255, 255, 255, 0.4);
    --search-bg: rgba(255, 255, 255, 0.07);
    --search-border: rgba(255, 255, 255, 0.12);
    --search-focus-bg: rgba(255, 255, 255, 0.1);
    --search-focus-border: rgba(255, 255, 255, 0.3);
    --chip-bg: rgba(255, 255, 255, 0.08);
    --chip-color: rgba(255, 255, 255, 0.7);
    --chip-hover-bg: rgba(255, 255, 255, 0.14);
    --chip-active-bg: #fff;
    --chip-active-color: #0f0f0f;
    --accent: #3ea6ff;
  }

  :global(body) {
    background: var(--bg, #f5f5f7);
  }

  .topnav {
    position: sticky; top: 0; z-index: 50;
    display: flex; align-items: center;
    height: 56px; padding: 0 20px;
    background: var(--nav-bg);
    backdrop-filter: blur(8px);
    border-bottom: 0.5px solid var(--border);
  }

  .logo {
    flex: 1;
    font-size: 16px; font-weight: 600;
    letter-spacing: -0.4px; color: var(--text);
  }
  .logo-dot { color: var(--accent); }

  .search-wrap {
    flex: 0 0 440px;
    display: flex; align-items: center; gap: 10px;
    background: var(--search-bg);
    border: 0.5px solid var(--search-border);
    border-radius: 22px; padding: 0 14px; height: 36px;
    transition: border-color 0.15s, background 0.15s;
  }
  .search-wrap:focus-within {
    border-color: var(--search-focus-border);
    background: var(--search-focus-bg);
  }

  .search-icon { width: 15px; height: 15px; color: var(--text-muted); flex-shrink: 0; }

  input[type="search"] {
    flex: 1; background: none; border: none; outline: none;
    color: var(--text); font-size: 14px;
  }
  input[type="search"]::placeholder { color: var(--text-muted); }
  input[type="search"]::-webkit-search-cancel-button { display: none; }

  .nav-links {
    flex: 1;
    display: flex; gap: 4px; justify-content: flex-end; align-items: center;
  }
  .nav-links a {
    font-size: 13px; padding: 6px 12px; border-radius: 8px;
    color: var(--text-muted);
    transition: color 0.15s, background 0.15s;
  }
  .nav-links a:hover { color: var(--text); background: var(--chip-bg); }
  .nav-links a.active { color: var(--text); background: var(--chip-bg); }

  .theme-toggle {
    background: none; border: none; cursor: pointer;
    color: var(--text-muted); padding: 6px;
    border-radius: 8px; display: flex; align-items: center;
    transition: color 0.15s, background 0.15s;
  }
  .theme-toggle:hover { color: var(--text); background: var(--chip-bg); }

  main { flex: 1; }
</style>