<script lang="ts" setup>
	import type { Event } from "@cours-esir/salles_module";
	import { onMount } from "svelte";

	let jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
	let code = "";

	let { data } = $props();
	let { planning } = data;

	let days: { [day: string]: Event[] } = {};

	for (let event of planning.events) {
		let key = `${event.start.date.getDate().toString().padStart(2, "0")}/${(event.start.date.getMonth() + 1).toString().padStart(2, "0")}/${event.start.date.getFullYear()}`;
		if (days[key] === undefined) {
			days[key] = [];
		}
		days[key].push(event);
	}

	const hours: number[] = [
		7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
	];

	function get_time(date: Date): number {
		return date.getHours() + date.getMinutes() / 60;
	}
</script>

<h1>{code.replaceAll("_", " ")}</h1>

<div-planning>
	<rowbody>
		{#each Object.entries(days).toSorted() as [day, events]}
			<column class="events-list">
				<titre>{day}</titre>
				{#each events as event}
					<div
						style="top:calc( 66px + 50px * {get_time(
							event.start.date,
						) - hours[0]});height: calc( 50px * {get_time(
							event.end.date,
						) - get_time(event.start.date)})"
					>
						{event.description}
					</div>
				{/each}
			</column>
		{/each}
	</rowbody>
	<row-legend>
		{#each hours as y}
			<div
				class="lines"
				style="left:70px; top:calc( 50px * {y - hours[0]})"
			>
				<span class="text">{y % 24}h00</span>
				<span class="line"></span>
			</div>
		{/each}
	</row-legend>
</div-planning>

<style>
	h1 {
		text-align: center;
	}

	div-planning {
		padding-left: 70px !important;
		max-width: 1000px;
		width: cacl(100% - 70px);
		display: grid;
		position: relative;
		margin: auto;

		grid-template-columns: 1fr;
	}

	div-planning > * {
		--days: 5;
		width: 100%;
		height: auto;
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: repeat(5, 200px);
	}

	titre {
		/* margin: 20px 5px;
        width: calc(100% - 10px); */
		padding: 16px;
		text-align: center;
		display: block;
		font-size: 1.2em;
	}

	div-planning > row-legend {
		position: absolute;
		height: calc(50px * var(--hours));
		top: 66px;
		z-index: -1;
	}

	div-planning > row-legend > .lines {
		position: absolute;
		right: 0;
		width: 100%;
	}

	div-planning > row-legend > .lines > .text {
		transform: translate(-150%, -50%);
		position: absolute;
	}
	div-planning > row-legend > .lines > .line {
		border-top: 1px solid var(--text);
		top: 0;
		display: block;
		width: calc(100% - 70px);
	}

	rowbody {
		width: 100%;
		overflow-x: auto;
		height: 900px;
	}

	column > * {
		/* text-overflow: '..'; */
		overflow: hidden;
	}

	.events-list {
		position: relative;
		height: calc(50px * var(--hours));
	}
	.events-list > div {
		--decalage: 0.1em;
		border-radius: 0.6em;
		margin: 0 var(--decalage);
		width: calc(100% - var(--decalage) * 2 - 16px);
		position: absolute;
		left: 0;
		background: var(--blue);
		padding: 0 8px;
	}
</style>
