<script lang="ts">
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
			<div class="flex flex-col gap-4">
				<h2 class="text-2xl font-bold">Salles du {batiment}</h2>
				{#each Object.entries(salles).toSorted() as [salle, salleInfo]}
					<SalleCard {salle} {salleInfo} {date}></SalleCard>
				{/each}
			</div>
		{/each}
	{/each}
</div>
