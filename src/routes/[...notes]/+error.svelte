<script lang="ts">
	import { page } from '$app/stores'
</script>

<div>
	<h1>{$page.status}</h1>
	{#if $page.error?.message}
		<p>{$page.error.message}</p>
	{/if}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		max-width: 47.5rem;
		padding: 1rem 2rem;
		align-self: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		text-align: center;
		gap: 1rem;
	}
	h1,
	p {
		margin: 0;
	}
	p {
		color: var(--text-secondary);
	}
</style>
