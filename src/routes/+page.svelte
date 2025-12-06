<script lang="ts">
	import { onMount } from "svelte";
	import SalleCard from "$lib/SalleCard.svelte";
	import Icons from "$lib/Icons.svelte";

	let { data } = $props();
</script>

<div class="container">
	<header>Salles Libres</header>

	{#each Object.entries(data.retour) as [university, batiments]}
		{#each Object.entries(batiments) as [batiment, salles]}
			<div style="display:flex;align-items:center;gap:16px;">
				<h2>Salles du {batiment}</h2>
				<!-- <button
					on:click={() => (batiment.setShow = !batiment.getShow)}
					style="all:unset;display:grid;place-items:center;"
					><Icons name="eye" width="24"></Icons></button
				> -->
			</div>
			{#each Object.entries(salles) as [salle, state]}
				<SalleCard
					{salle}
					{batiment}
					{state}
				></SalleCard>
			{/each}
		{/each}
	{/each}
</div>

<style>
	p {
		color: var(--color);
	}

	.flexgrid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 16px;
	}

	.container {
		padding: 16px;
	}
</style>
