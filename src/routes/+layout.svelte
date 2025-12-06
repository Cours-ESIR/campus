<script lang="ts">
	import "../app.css";
	export let data;

	import Footer from "$lib/Footer.svelte";
	import { cubicOut } from "svelte/easing";
	function customScale(node, options) {
		return {
			duration: options.duration,
			easing: cubicOut,
			css: (t) =>
				`opacity:${t};transform:scaleY(${t / 10 + 0.9}); transform-origin: top;`,
		};
	}
</script>

<svelte:head>
	<title>Beaulieu'Camp - {data.pathname}</title>
</svelte:head>

<main class="w-dvw h-dvh flex flex-col">
	<div
		class="w-full h-full overflow-auto relative"
		in:customScale={{ duration: 750 }}
	>
		<slot></slot>
	</div>
	<Footer />
</main>
