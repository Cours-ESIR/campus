<script lang="ts">
	import { MagnifyingGlass } from "@steeze-ui/phosphor-icons";
	import { Icon } from "@steeze-ui/svelte-icon";

	let { map, layers } = $props();

	let layers2 = [];

	for (let layer of layers) {
		for (let item of layer.features) {
			layers2.push({
				name: item.properties.name,
				bounds: item.properties.bounds,
			});
		}
	}

	let searchvalue = $state("");

	let filtered = $derived(
		layers2
			.filter((layer) => {
				let str1 = denoise(layer.name);
				let str2 = denoise(searchvalue);
				return str1.includes(str2); // est ce que le nom inclus le valeur de l'input
			})
			.slice(0, 5),
	);

	function denoise(str: string) {
		let normalized = str
			.normalize("NFD")
			.replace(/\p{Diacritic}/gu, "")
			.toLowerCase();
		return normalized;
	}

	function zoom(e, bounds) {
		map.fitBounds(bounds);
		e.target.blur();
	}
</script>

<div
	class="group absolute top-4 left-4 z-50 bg-blue-500 rounded-2xl p-2 flex flex-col gap-2 text-left text-lg"
>
	<div class=" flex items-center">
		<input class=" border-0 outline-0 w-full" bind:value={searchvalue} />
		<Icon src={MagnifyingGlass} class="size-6" theme="fill"></Icon>
	</div>
	<div class="group-focus-within:flex hidden flex-col w-full">
		{#each filtered as layer}
			<button
				class="text-left"
				tabindex="0"
				onclick={(e) => zoom(e, layer.bounds)}>{layer.name}</button
			>
		{/each}
	</div>
</div>
