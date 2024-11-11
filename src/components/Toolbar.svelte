<ul>
	<slot />
</ul>

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
	:global(ul button) {
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
	:global(ul button:active) {
		color: var(--text-primary);
	}
	:global(ul button:hover) {
		background-color: var(--leaf);
	}
	:global(ul svg) {
		width: 1.15rem;
	}
</style>
