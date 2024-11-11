<script lang="ts">
	import { page } from '$app/stores'
	import type { Leaf } from '../../types'
	export let leaf: Leaf
	const depth = (path: string) => path.split('/').filter((path) => path).length - 1
</script>

<a
	class:active={$page.url.pathname === encodeURI(leaf.path)}
	style:--chevron-placeholder="1.125rem"
	style:--chevron-placeholder-with-padding="calc(var(--chevron-placeholder) + 0.5rem)"
	style:padding-left="calc({depth(leaf.path) === 0
		? 0
		: depth(leaf.path) + depth(leaf.path) * 0.25}rem + var(--chevron-placeholder-with-padding))"
	href={encodeURI(leaf.path)}
>
	<span>{leaf.title}</span>
	{#if leaf.extension !== 'md'}
		<span class="extension">{leaf.extension.toUpperCase()}</span>
	{/if}
</a>

<style>
	.extension {
		flex-shrink: 0;
		background-color: var(--leaf);
		border-radius: 4px;
		text-transform: uppercase;
		padding: 0 4px;
		letter-spacing: 0.05em;
		line-height: 1.5;
		font-size: 9px;
		margin-left: 6px;
	}
	a {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 0.5rem;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		user-select: none;
		color: var(--text-secondary);
	}
	a:focus {
		box-shadow: 0 0 0 2px #555;
	}
	.active {
		background-color: var(--leaf);
		color: var(--text-primary);
	}
	a:hover {
		background-color: var(--leaf);
	}
	span {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		/* padding-left: 0.5rem; */
	}
</style>
