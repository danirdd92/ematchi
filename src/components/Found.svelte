<script lang="ts">
	import { recieve, getEmojiUrl } from '$lib';

	export let found: string[];
</script>

<div class="found">
	{#each found as emoji (emoji)}
		<div class="pair">
			<img in:recieve={{ key: `${emoji}:a` }} src={getEmojiUrl(emoji)} alt={emoji} />
			<img in:recieve={{ key: `${emoji}:b` }} src={getEmojiUrl(emoji)} alt={emoji} />
		</div>
	{/each}
</div>

<style>
	.found {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.75em;
		height: 100%;
		filter: drop-shadow(0.2em 0.2em 0.5em rgba(0 0 0 / 0.2));
	}
	.pair {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 6em;
		height: 6em;
		background: #fff;
		padding: 1em;
		border-radius: 50%;
	}
	img {
		position: absolute;
		width: 4em;
		height: 4em;
	}
</style>
