<script lang="ts">
	import Card from "$lib/Card.svelte";
	import Header from "$lib/Header.svelte";

	let { data } = $props();
	let { cours } = data;
</script>

<div class="p-4 items-center flex flex-col gap-8 h-full *:w-full *:max-w-xl">
	<Header>Listes des cours</Header>
	<div>
		Cette page est en Bêta.
		<br>
		<a href="https://github.com/Cours-ESIR/Cours/">
			Pour modifier des cours ou en ajouter, cliquer ici.
		</a>
		<br>
		
		À terme : 
		<ul class="list-disc">
			<li> je ne souterais plus avoir des cours en fonction des années d'étude, mais en fonction de thèmes </li>
			<li> je souhaites que tout le contenu soit original (pas d'anales par exemple) </li>
			<li> je voudrais ajouter des intégrations, par exemple draw.io ou typst </li>
		</ul>
	</div>
	{#each Object.entries(cours) as [id, { name, buffer }]}
		<a href="/cours/{id}">
			<Card title={name}></Card>
		</a>
	{/each}
</div>
