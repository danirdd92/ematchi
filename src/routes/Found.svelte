<script lang="ts">
	import { getEmojiUrl } from './utils';

	export let found: string[];
</script>

<div class="found">
	{#each found as emoji (emoji)}
		<img src={getEmojiUrl(emoji)} alt={emoji} />
	{/each}
</div>

<style>
	.found {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.75em;
		margin-top: 2em;
	}
	img {
		width: 4em;
		height: 4em;
	}
</style>
