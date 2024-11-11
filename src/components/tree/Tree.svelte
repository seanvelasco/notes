<script lang="ts">
	import Branches from './Branches.svelte'
	import type { Tree } from '../../types'
	export let tree: Tree
	export let expand: boolean
</script>

<div>
	<Branches {expand} {tree} />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: 100%;
		padding: 0.25rem 1rem;
	}
</style>
