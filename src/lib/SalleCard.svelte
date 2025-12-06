<script lang="ts">
	import {
		salleLibres,
		type Event as CalEvent,
	} from "@cours-esir/salles_module";
	import { Calendar, Timer } from "@steeze-ui/phosphor-icons";
	import { Icon } from "@steeze-ui/svelte-icon";

	let {
		salle,
		salleInfo,
		date,
	}: {
		salle: String;
		salleInfo: { id: string; events: CalEvent[] };
		date: Date;
	} = $props();

	let { until, state, error } = $derived(salleLibres(salleInfo.events, date));

	function stringify_date(until: Date) {
		if (until === undefined) return "updating";
		return until.toLocaleString("fr");
	}

	function formatTime(time: number) {
		time = Math.floor(time / 1000 / 60);
		let minutes = time % 60;
		let hours = (time - minutes) / 60;
		return `${hours} heures et ${minutes} minutes`;
	}

	function stringify_time(until: Date) {
		if (until === undefined) return "updating";

		let time = Math.abs(date.getTime() - until.getTime());
		return formatTime(time);
	}
</script>

<a href="/salle/{salleInfo.id}">
	{#if error}
		<div>
			<p>🔴 {error}</p>
			<h3>{salle}</h3>
		</div>
	{:else}
		<div
			class="items-center rounded-xl p-4 flex-wrap gap-4 flex justify-between {state ==
			'Libre'
				? 'bg-green-500/30 bg-green-500/50'
				: 'bg-red-500/30 bg-red-500/50'}"
		>
			<h3 class="text-6xl">{salle}</h3>

			<div class="flex flex-col gap-2">
				<p class="flex gap-2">
					<Icon theme="bold" class="size-6" src={Calendar}></Icon>
					{state} jusqu'au {stringify_date(until)}
				</p>
				<p class="flex gap-2">
					<Icon theme="bold" class="size-6" src={Timer}></Icon>
					{state} pendant {stringify_time(until)}
				</p>
			</div>
		</div>
	{/if}
</a>
