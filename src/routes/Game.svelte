<script lang="ts">
	import { onMount } from 'svelte';
	import Countdown from './Countdown.svelte';
	import Found from './Found.svelte';
	import Grid from './Grid.svelte';
	import type { Level } from './levels';
	import { levels } from './levels';
	import { shuffle } from './utils';

	const level = levels[0];

	let grid: string[] = createGrid(level);
	let found: string[] = [];
	let remaining = level.duration;
	let duration = level.duration;
	let playing = false;

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
			if (playing) return;

			requestAnimationFrame(loop);
			remaining = remainingAtStart - (Date.now() - start);

			if (remaining <= 0) {
				// GAME LOST

				playing = false;
			}
		}

		loop();
	}

	onMount(countdown);
</script>

<div class="game">
	<div class="info">
		<Countdown {remaining} duration={level.duration} />
	</div>
	<div class="grid-container">
		<Grid
			on:found={(e) => {
				found = [...found, e.detail.emoji];
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
