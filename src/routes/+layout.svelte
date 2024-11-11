<script lang="ts">
	import { page } from '$app/stores'
	import Breadcrumbs from '../components/Breadcrumbs.svelte'
	import Tree from '../components/tree/Tree.svelte'
	import Sort from '../icons/Sort.svelte'
	import Collapse from '../icons/Collapse.svelte'
	import Expand from '../icons/Expand.svelte'
	import Search from '../icons/Search.svelte'
	import Ellipsis from '../icons/Ellipsis.svelte'
	import Audio from '../icons/Audio.svelte'
	let { data, children } = $props()

	let expand = $state(false)
</script>

<aside>
	<ul>
		<button><Sort /></button>
		<button onclick={() => (expand = !expand)}>
			{#if expand}
				<Collapse />
			{:else}
				<Expand />
			{/if}
		</button>
	</ul>
	{#if data.tree}
		<Tree bind:expand tree={data.tree} />
	{/if}
</aside>
<div>
	<header>
		<ul>
			<button>
				<Search />
			</button>
		</ul>
		<Breadcrumbs />
		<ul>
			{#if $page.data.body}
				<button>
					<Audio />
				</button>
			{/if}
			<button>
				<Ellipsis />
			</button>
		</ul>
	</header>
	{@render children()}
</div>

<style>
	ul {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2px;
		height: 100%;
		height: 2.5rem;
		margin: 0;
		position: sticky;
		top: 0;
		background-color: var(--background-secondary);
		padding: 8px;
		z-index: 1;
	}
	header ul {
		background-color: var(--background-primary);
	}
	ul button {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 4px 6px;
		border-radius: 4px;
		opacity: 0.85;
		transition: opacity 0.15s ease-in-out;
		color: var(--text-secondary);
	}
	ul button:active {
		color: var(--text-primary);
	}
	ul button:hover {
		background-color: var(--leaf);
	}
	:global(ul svg) {
		width: auto;
		height: 1.125rem;
	}
	div {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		overflow-y: auto;
		background-color: var(--background-primary);
	}
	aside {
		position: relative;
		font-size: 0.875rem;
		display: flex;
		flex-direction: column;
		min-width: 18rem;
		max-width: 18rem;
		width: 100%;
		height: 100%;
		background-color: var(--background-secondary);
		overflow: scroll;
		border-right: 1px solid var(--border-secondary);
	}
	header {
		display: flex;
		flex-direction: row;
		height: 2.5rem;
		flex-shrink: 0;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		top: 0;
		z-index: 3;
		background-color: var(--background-primary);
		padding: 0 0.5rem;
	}
	/* main {
		position: relative;
		display: flex;
		justify-content: center;
		margin-bottom: 4rem;
		width: 100%;
	} */
</style>
