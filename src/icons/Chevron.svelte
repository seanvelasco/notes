<script lang="ts">
	export let orientation: 'right' | 'bottom'
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 16 16"
	fill="currentColor"
	width="24"
	height="24"
	style:transform={orientation === 'right' ? '' : 'rotate(90deg)'}
>
	<path
		fill-rule="evenodd"
		d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
		clip-rule="evenodd"
	/>
</svg>

<style>
	svg {
		color: var(--bullet);
		stroke-width: 20px;
		height: 1.125rem;
		width: 1.125rem;
		transition: transform 100ms ease-in-out;
		flex-shrink: 0;
	}
</style>
