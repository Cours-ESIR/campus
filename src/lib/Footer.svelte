<script lang="ts">
    import Icons from "$lib/Icons.svelte"
</script>

<footer>
	<a class="iconbtn" href="/"><Icons width="24" name="home"/></a>
	<a class="iconbtn" href="/map"><Icons width="24" name="map"/></a>
	<a class="iconbtn" href="/settings"><Icons width="24" name="info"/></a>
	<a class="iconbtn" target="_blank" href="https://github.com/beaulieu-camp"><Icons width="24" name="github"/></a>
</footer>

<style>
	
	footer {
		display: flex;
		justify-content:center;
		align-items: center;

		background-color: var(--primary);
		box-shadow: var(--shadow);
		width: 100%;

		overflow: hidden;
		gap:8px
	}
  
	a {
		text-align:center;
		border-radius: 100%;
		margin: 8px;
	}

</style>