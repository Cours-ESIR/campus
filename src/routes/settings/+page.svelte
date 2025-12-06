<script lang="ts">
	import Card from "$lib/Card.svelte";
	import Header from "$lib/Header.svelte";
</script>

<div class="p-4 items-center flex flex-col gap-8 h-full *:w-full *:max-w-xl">
	<Header>Informations</Header>

	<Card title="Liste des librairies utilisées">
		<ul>
			{#each Object.entries(PACKAGES) as [dependency, version]}
				<li>{dependency} : {version}</li>
			{/each}
		</ul>
	</Card>

	<Card title="Listes des développeurs">
		<ul>
			<li>AquaBx</li>
		</ul>
	</Card>

	<Card title="Mentions légales">
		Aucune récupération de données. Non affilié avec l'Université de Rennes.
	</Card>
</div>