<script lang="ts">
	import { page } from '$app/stores'
	import Branches from './Branches.svelte'
	import Chevron from '../../icons/Chevron.svelte'
	import type { Branch } from '../../types'
	let { branch, expand }: { branch: Branch; expand: boolean } = $props()

	let button: HTMLButtonElement
	const segments = $page.params.notes.split('/')
	const paths = segments.map((_, index) => '/' + segments.slice(0, index + 1).join('/'))

	let open = $state(paths.includes(branch.path))

	$effect(() => {
		if ($page.url.pathname === encodeURI(branch.path)) {
			button.focus()
		}
		// open = expand
	})

	const depth = (path: string) => path.split('/').filter((path) => path).length - 1
</script>

<button
	bind:this={button}
	class:active={$page.url.pathname === encodeURI(branch.path)}
	style:padding-left="calc({depth(branch.path) === 0
		? 0.5
		: 0.5 + depth(branch.path) + depth(branch.path) * 0.25}rem)"
	onclick={(event) => {
		event.preventDefault()
		button.blur()
		open = !open
	}}
>
	<Chevron orientation={open ? 'bottom' : 'right'} />
	<span>
		{branch.title}
	</span>
</button>
{#if open && branch.children?.length}
	<div
		style:--chevron-placeholder="1.125rem"
		style:--offset="calc({depth(branch.path) === 0
			? 0
			: depth(branch.path) + depth(branch.path) * 0.25}rem + (var(--chevron-placeholder) / 2) +
		0.5rem - 0.5px)"
	>
		<Branches {expand} tree={branch.children} />
	</div>
{/if}

<style>
	button {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 0.5rem;
		padding: 0.25rem 0;
		cursor: pointer;
		user-select: none;
		color: var(--text-secondary);
	}
	button:focus {
		box-shadow: 0 0 0 2px #555;
	}
	button:hover {
		background-color: var(--leaf);
	}
	span {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding-left: 0.5rem;
	}
	div {
		display: flex;
		flex-direction: column;
		position: relative;
		gap: inherit;
	}
	div::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		bottom: 0;
		left: var(--offset);
		width: 1px;
		height: 100%;
		background-color: var(--thread);
	}
</style>
