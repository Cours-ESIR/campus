<script lang="ts">

    import Card from "$lib/Card.svelte";

</script>

<div class="container">
    <header>Informations</header>

    <Card title="Liste des librairies utilisées">
        <ul>
            <li>sveltekit</li>
            <li>mapbox</li>
            <li>hammerjs</li>
            <li>openstreetmap</li>
            <li>cartocdn</li>
        </ul>
    </Card>

    <Card title="Liste des librairies d'icones utilisées">
    <ul>
        <li>css.gg</li>
        <li>fontawesome</li>
        <li>simple-icons</li>
    </ul>
    </Card>

    <Card title="Listes des développeurs">
        <ul>
            <li>AquaBx</li>
        </ul>
    </Card>

    <Card title="Mentions légales">
        Aucune récupération de données.
        
        Non affilié avec l'Université de Rennes.
    </Card>

</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        padding: 16px;
        gap: 16px;
    }
    .iconbtn {
        background-color: var(--secondary);
        border-radius: 16px;
    }
    .iconbtn:hover {
        background-color: var(--accent-hover);
    }
</style>