<script lang="ts">
	import { getEmojiUrl, send } from '$lib';

	export let emoji: string;
	export let selected: boolean;
	export let found: boolean;
	export let group: 'a' | 'b';
</script>

<div class="square" class:flipped={selected || found}>
	<!-- use on:click to forward event handler from Square to Grid -->
	<button on:click />

	<div class="background" />

	{#if !found}
		<img out:send={{ key: `${emoji}:${group}` }} src={getEmojiUrl(emoji)} alt={emoji} />
	{/if}
</div>

<style>
	.square {
		display: flex;
		justify-content: center;
		align-items: center;
		transform-style: preserve-3d;
		transition: transform 0.4s;
	}

	.flipped {
		transform: rotateY(180deg);
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		background: #eee;
		border: 0;
		border-radius: 1em;
		font-size: inherit;
	}

	.background {
		position: absolute;
		background: #fff;
		border: 0.5em solid #eee;
		transform: rotateY(180deg);
		backface-visibility: hidden;
		width: 100%;
		height: 100%;
	}

	img {
		width: 7em;
		height: 7em;
		pointer-events: none;
		transform: rotateY(180deg);
		backface-visibility: hidden;
	}
</style>
