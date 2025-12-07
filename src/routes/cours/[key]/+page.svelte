<script lang="ts">
	import FileView from "$lib/FileView.svelte";
	import Header from "$lib/Header.svelte";

	let { data } = $props();
	let { cours } = data;
</script>

<div class="p-4 items-center flex flex-col gap-8 h-full *:w-full *:max-w-xl">
	<Header>{cours.name}</Header>
	<p>
		Cette page est en Bêta.
		<a href="https://github.com/Cours-ESIR/Cours/{cours.name.replace("Cours-","edit/")}">Pour modifier ce cours, cliquer ici.</a>
	</p>
	<FileView buffer={cours.buffer}></FileView>
</div>
