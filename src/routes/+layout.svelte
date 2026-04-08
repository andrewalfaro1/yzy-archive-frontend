<script lang="ts">
	import './layout.css';
</script>

<div class="app-shell">
	<header class="topbar">
		<a href="/" class="brand">YeTube</a>
	</header>

	<main>
		<slot />
	</main>
</div>

<style>
	.topbar {
		position: sticky;
		top: 0;
		z-index: 10;
		height: 64px;
		display: flex;
		align-items: center;
		padding: 0 1.5rem;
		background: rgba(15, 15, 16, 0.9);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border);
	}

	.brand {
		font-size: 1.25rem;
		font-weight: 800;
		letter-spacing: -0.02em;
	}

	.brand:hover {
		color: white;
	}
</style>
