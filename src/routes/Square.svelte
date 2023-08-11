<script lang="ts">
	import { getEmojiUrl } from './utils';

	export let emoji: string;
	export let selected: boolean;
	export let found: boolean;
</script>

<div class="square" class:flipped={selected}>
	<!-- use on:click to forward event handler from Square to Grid -->
	<button on:click />
	{#if !found}
		<img src={getEmojiUrl(emoji)} alt={emoji} />
	{/if}
</div>

<style>
	.square {
		background: yellow;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		width: 7em;
		height: 7em;
		pointer-events: none;
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.flipped button {
		background: red;
	}
</style>
