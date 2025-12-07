<script lang="ts">
	import BatimentCard from "$lib/BatimentCard.svelte";
	import Header from "$lib/Header.svelte";
	import SalleCard from "$lib/SalleCard.svelte";
	let { data } = $props();
	let date = $state(new Date());

	setInterval(() => {
		date = new Date();
	}, 1000 * 60);
</script>

<div class="p-4 items-center flex flex-col gap-8 h-full *:w-full *:max-w-xl">
	<Header>Salles Libres</Header>

	{#each Object.entries(data.retour).toSorted() as [university, batiments]}
		{#each Object.entries(batiments).toSorted() as [batiment, salles]}
			<BatimentCard {batiment} {salles} {date}></BatimentCard>
		{/each}
	{/each}
</div>
