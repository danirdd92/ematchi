<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Countdown, Found, Grid } from '$components';
	import { shuffle, type Level } from '$lib';

	const dispatch = createEventDispatcher();

	let size: number;
	let grid: string[] = [];
	let found: string[] = [];
	let remaining = 0;
	let duration = 0;
	let playing = false;

	export function start(level: Level) {
		size = level.size;
		grid = createGrid(level);
		remaining = duration = level.duration;

		resume();
	}

	export function resume() {
		playing = true;
		countdown();

		dispatch('play');
	}

	function createGrid(level: Level) {
		const emojis = [...level.emojis];
		const pairs: string[] = [];

		for (let i = 0; i < level.size ** 2 / 2; i++) {
			const index = Math.floor(Math.random() * emojis.length);
			const emoji = emojis[index];
			emojis.splice(index, 1);
			pairs.push(emoji);
		}
		// get duplicate of pairs
		pairs.push(...pairs);

		return shuffle(pairs);
	}

	function countdown() {
		const start = Date.now();
		let remainingAtStart = remaining;

		function loop() {
			if (!playing) return;

			requestAnimationFrame(loop);
			remaining = remainingAtStart - (Date.now() - start);

			if (remaining <= 0) {
				// GAME LOST
				dispatch('lose');
				playing = false;
			}
		}

		loop();
	}
</script>

<div class="game" style="--size: {size}">
	<div class="info">
		{#if playing}
			<Countdown
				{remaining}
				{duration}
				on:click={() => {
					// Pause game
					playing = false;
					dispatch('pause');
				}}
			/>
		{/if}
	</div>
	<div class="grid-container">
		<Grid
			on:found={(e) => {
				found = [...found, e.detail.emoji];

				if (found.length === (size * size) / 2) {
					// WIN
					dispatch('win');
				}
			}}
			{grid}
			{found}
		/>
	</div>
	<div class="info">
		<Found {found} />
	</div>
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: min(1vmin, 0.5rem);
	}

	.info {
		width: 80em;
		height: 10em;
	}
	.grid-container {
		width: 80em;
		height: 80em;
	}
</style>
