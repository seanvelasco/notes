<script lang="ts">
	import Branch from './Branch.svelte'
	import Leaf from './Leaf.svelte'
	import type { Tree } from '../../types'
	export let tree: Tree
	export let expand: boolean
</script>

{#each tree as branch}
	{#if branch.children && branch.children.length}
		<Branch {expand} {branch} />
	{:else}
		<Leaf leaf={branch} />
	{/if}
{/each}
