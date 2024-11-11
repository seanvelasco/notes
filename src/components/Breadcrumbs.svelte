<script lang="ts">
	import { page } from '$app/stores'

	const paths = () => {
		const breadcrumbs: { label: string; href: string }[] = []
		for (const path of $page.params.notes.split('/')) {
			const prev = breadcrumbs[breadcrumbs.length - 1]
			breadcrumbs.push({
				label: path,
				href: prev ? `${prev.href}/${path}` : `/${path}`
			})
		}
		return breadcrumbs
	}

	const breadcrumbs = $derived(paths())
</script>

<nav>
	{#each breadcrumbs as { label, href }, index}
		<a class:active={$page.url.pathname === encodeURI(href)} {href}>
			{decodeURIComponent(label)}
		</a>
		{#if index < breadcrumbs.length - 1}
			<span>/</span>
		{/if}
	{/each}
</nav>

<style>
	nav {
		display: flex;
		user-select: none;
		/* gap: 0.267rem; */
		align-items: center;
		scrollbar-width: none;
		overflow-x: scroll;
		font-size: 0.867rem;
		color: var(--text-secondary);
	}
	a {
		display: inline-flex;
		cursor: pointer;
		/* border-radius: 0.375rem; */
		border-radius: 0.267rem;
		/* padding: 0.125rem 0.375rem; */
		padding: 0.133rem 0.267rem;
		white-space: nowrap;
		line-height: initial;
	}
	a:hover {
		background-color: var(--border-secondary);
		color: var(--text-primary);
	}
	.active {
		color: var(--active-breadcrumb);
	}
	.active:hover {
		background-color: initial;
		color: var(--active-breadcrumb);
	}
	span {
		color: var(--background-quaternary);
		padding: 2px 1px;
	}
</style>
