<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Square from './Square.svelte';

	export let grid: string[];
	export let found: string[];

	const dispatch = createEventDispatcher();

	let a = -1;
	let b = -1;
	let resetTimeout: number;

	function tryMatch(i: number, emoji: string) {
		clearTimeout(resetTimeout);
		// JS why you no have pattern matching!??!
		if (a === -1 && b === -1) {
			a = i;
		} else if (b === -1) {
			b = i;

			if (grid[a] === grid[b]) {
				// is match
				dispatch('found', {
					emoji
				});
			} else {
				// not match
				resetTimeout = setTimeout(() => {
					a = -1;
					b = -1;
				}, 1000);
			}
		} else {
			b = -1;
			a = i;
		}
	}
</script>

<div class="grid">
	{#each grid as emoji, i}
		<Square
			on:click={() => tryMatch(i, emoji)}
			selected={a === i || b === i}
			found={found.includes(emoji)}
			{emoji}
		/>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		grid-gap: 0.5em;
		height: 100%;
	}
</style>
