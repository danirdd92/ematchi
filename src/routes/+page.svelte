<script lang="ts">
	import { Game, Modal } from '$components';
	import { levels } from '$lib';
	import { confetti } from '@neoconfetti/svelte';
	import '../styles.css';

	let state: 'waiting' | 'playing' | 'paused' | 'won' | 'lost' = 'waiting';

	let game: Game;
</script>

<Game
	bind:this={game}
	on:play={() => (state = 'playing')}
	on:lose={() => (state = 'lost')}
	on:pause={() => (state = 'paused')}
	on:win={() => (state = 'won')}
/>

{#if state !== 'playing'}
	<Modal>
		<header>
			<h1>e<span>match</span>i</h1>
			<p>the emoji matching game</p>
		</header>

		{#if state === 'won' || 'lost'}
			<p>you {state} the game</p>
		{:else if state === 'paused'}
			<p>game paused</p>
		{:else if state === 'waiting'}
			<p>choose a level:</p>
		{/if}

		<div class="buttons">
			{#if state === 'paused'}
				<button on:click={() => game.resume()}>resume</button>
			{:else}
				{#each levels as level}
					<button on:click={() => game.start(level)}>{level.label}</button>
				{/each}
			{/if}
		</div>
	</Modal>
{/if}

{#if state === 'won'}
	<div
		class="confetti"
		use:confetti={{
			stageWidth: innerWidth,
			stageHeight: innerHeight
		}}
	/>
{/if}

<style>
	h1 {
		font-size: 4em;
	}
	h1 span {
		color: purple;
	}
	p {
		font-family: Grandstander;
	}

	.confetti {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 30%;
		pointer-events: none;
	}
</style>
