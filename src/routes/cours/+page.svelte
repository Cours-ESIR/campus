<script lang="ts">
	import Card from "$lib/Card.svelte";
	import Header from "$lib/Header.svelte";

	let { data } = $props();
	let { cours } = data;
</script>

<div class="p-4 items-center flex flex-col gap-8 h-full *:w-full *:max-w-xl">
	<Header>Listes des cours</Header>
	<p>
		Cette page est en Bêta.
		<a href="https://github.com/Cours-ESIR/Cours/">
			Pour modifier des cours ou en ajouter, cliquer ici.
		</a>
	</p>
	{#each Object.entries(cours) as [id, { name, buffer }]}
		<a href="/cours/{id}">
			<Card title={name}></Card>
		</a>
	{/each}
</div>
