<script lang="ts">
	import '../app.css';
	import DarkToggle from '../components/DarkToggle.svelte';
	import pierre from '../lib/assets/pierre_magique.png';
	import { Sun, MoonStar } from 'lucide-svelte';

	let { children } = $props();
</script>

<div class="tracking-wide text-black antialiased">
	<nav class="flex h-20 items-center justify-between bg-red-800">
		<div class="flex w-60 items-center justify-center">
			<img class="h-20" src={pierre} alt="la pierre magique" />
		</div>
		<DarkToggle class="mr-2 h-10 w-10"></DarkToggle>
	</nav>
	<main class=" grid h-dvh grid-cols-[auto_1fr] font-comic">
		<div class="flex h-full w-60 flex-col items-center justify-between bg-red-800">
			<span class="blink text-gray-100">Attention !</span>
		</div>
		<div class="h-full w-full bg-gray-100">
			{@render children()}
		</div>
	</main>
</div>

<style>
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.blink {
		animation: blink 1s steps(1, start) infinite;
	}
</style>
