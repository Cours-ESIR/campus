<script>
	import { Icon } from "@steeze-ui/svelte-icon";
	import SalleCard from "./SalleCard.svelte";
	import { Eye, EyeClosed } from "@steeze-ui/phosphor-icons";

    let {batiment, salles, date} = $props()

    let shown = $state(false)
</script>


<div class="flex flex-col gap-4">
    <button onclick={() => shown = !shown} class="text-2xl font-bold flex gap-4 items-center justify-center p-2">
        Salles du {batiment}
        <Icon src={shown ? Eye : EyeClosed} class="size-6"></Icon>
    </button>
    {#if shown}
        {#each Object.entries(salles).toSorted() as [salle, salleInfo]}
            <SalleCard {salle} {salleInfo} {date}></SalleCard>
        {/each}
    {/if}
</div>