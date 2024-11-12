<script lang="ts">
	import { page } from '$app/stores'
	import { HOSTNAME, image, audio, video, document } from '$lib/constants'
	// import 'katex/dist/katex.min.css'
	export let data
</script>

<div
	class:index={data.index}
	class:note={data.body !== undefined}
	class:pdf={data?.extension === 'pdf'}
	class:image={image.includes(data?.extension || '')}
	class:video={video.includes(data?.extension || '')}
>
	{#if data.body !== undefined}
		<main>
			<h1>{data.title}</h1>
			{#if data.body}
				{@html data.body}
				<footer>
					<span>{data.words} words</span>
					<span>{data.characters} characters</span>
				</footer>
			{:else if data.body === ''}
				<p>This page is empty</p>
			{/if}
		</main>
	{:else if data.index}
		<h1>{data.title}</h1>
		{#each data.index as { title, path, children }}
			<a href={path}
				>{title}
				{#if children.length}
					({children.length})
				{/if}
			</a>
		{/each}
	{:else if data.extension}
		{@const src = `${$page.params.notes}.${data.extension}`}
		{#if image.includes(data.extension)}
			<img alt={data.title} {src} />
		{:else if video.includes(data.extension)}
			<!-- svelte-ignore a11y_media_has_caption -->
			<video controls>
				<source {src} type="video/{data.extension}" />
				Your browser does not support the video tag.
			</video>
		{:else if audio.includes(data.extension)}
			{@const extension = data.extension === 'mp3' ? 'mpeg' : data.extension}
			<audio controls={true}>
				<source {src} type="audio/{extension}" />
				Your browser does not support the audio element.
			</audio>
		{:else if document.includes(data.extension)}
			<object title={data.title} data={src}> </object>
		{/if}
	{/if}
</div>

<svelte:head>
	{#if data.title}
		<title>{data.title}</title>
		<meta name="og:title" content={data.title} />
	{:else}
		<title>Notes</title>
		<meta name="og:title" content="Notes" />
	{/if}
	<meta name="og:url" content="https://{HOSTNAME}/{$page.params.notes}" />
	<link rel="canonical" href="https://${HOSTNAME}/{$page.params.notes}" />
</svelte:head>

<style>
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 1rem 2rem;
		color: var(--text-primary);
		height: 100%;
		align-self: center;
	}
	audio {
		width: 100%;
	}

	object {
		width: 100%;
		/* aspect-ratio: 4 / 3;
		 */
		height: 100%;
	}
	/* div:not(.index, .note) img {
		height: 100%;
		width: fit-content;
	} */

	.note,
	.index {
		max-width: 47.5rem;
	}
	.pdf {
		padding: 0;
	}
	footer {
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		right: 0;
		background-color: var(--background-secondary);
		color: var(--text-secondary);
		font-size: 0.75rem;
		min-height: 18px;
		border-width: 1px;
		border-radius: 8px 0 0 0;
		border-color: var(--border-primary);
		border-style: solid;
		padding: 0.3rem;
		padding-left: 0.6rem;
		padding-right: 1rem;
		gap: 0.5rem;
		cursor: default;
		border-bottom: none;
		border-right: none;
		user-select: none;
	}
	:global(footer svg) {
		height: 1rem;
	}
	.index {
		gap: 1em;
	}
	.index a {
		font-size: 1rem;
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-color: rgba(255, 255, 255, 0.13);
		width: fit-content;
	}

	:global(a) {
		color: var(--link);
	}
	/* :global(p, a, li, blockquote) {
		font-size: 0.875rem;
	} */
	:global(blockquote) {
		border-left: 2px solid var(--background-tertiary);
		border-color: #5c82f5;
		margin-left: 0;
		margin-right: 0;
		padding: 0.5rem 0.625rem;
	}
	:global(blockquote p) {
		display: inline-block;
	}
	:global(li::marker) {
		color: var(--background-quaternary);
	}
	:global(img) {
		width: 100%;
		object-fit: cover;
	}
	:global(pre) {
		-moz-tab-size: 4;
		-o-tab-size: 4;
		tab-size: 4;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
	}
	:global(table) {
		display: block;
		min-height: 100%;
		border-collapse: collapse;
		border-spacing: 0;
		line-height: 1.3;
		font-size: 0.875rem;
		overflow-x: auto;
		box-sizing: border-box;
		scrollbar-width: thin;
		padding-bottom: 0.75rem;
	}
	:global(th) {
		font-weight: 600;
	}
	:global(tr) {
		white-space: normal;
		overflow-wrap: normal;
		word-break: normal;
	}

	:global(td, th) {
		text-align: start;
		border: 1px solid var(--border-secondary);
		padding: 4px 8px;
		vertical-align: initial;
	}
	:global(:not(pre) > code) {
		color: var(--text-secondary);
		font-family: monospace;
		background-color: var(--background-tertiary);
		border-radius: 4px;
		font-size: 0.75rem;
		padding: 0.1em 0.25em;
	}
	:global(hr) {
		border: 1px solid var(--border-secondary);
	}
	:global(ol) {
		padding-left: 2rem;
	}
	img:not(.note) {
		width: fit-content;
		max-width: 100%;
	}
	.image {
		align-items: center;
	}
	.video {
		padding: 0;
		position: relative;
	}
	video {
		position: absolute;
		height: 100%;
		width: 100%;
		padding: 0;
		margin: 0;
	}
	main {
		position: absolute;
		margin: 0;
		width: 100%;
		padding: 1rem 2rem;
		padding-bottom: 20rem;
	}
	.note {
		position: relative;
		height: 100%;
		width: 100%;
		padding-bottom: 10rem;
		padding: 0;
		/* margin-bottom: 4rem; */
	}
</style>
