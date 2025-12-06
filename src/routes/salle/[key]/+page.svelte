<script lang="ts">
	import Header from "$lib/Header.svelte";
	import type { Event } from "@cours-esir/salles_module";
	let jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

	let { data } = $props();
	let { planning }: { planning: { events: Event[]; id: string } } = data;

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

	function calcTop(event: Event) {
		let calc = 20 + 40 * (get_time(event.start.date) - hours[0]);
		return `${calc}px`;
	}

	function calcHeight(event: Event) {
		let calc =
			40 * (get_time(event.end!.date) - get_time(event.start.date));
		return `${calc}px`;
	}
</script>

<div class="p-4 items-center flex flex-col gap-8 h-full *:w-full *:max-w-xl">
	<Header>{JSON.parse(atob(planning.id)).join(" - ")}</Header>

	<div
		class="overflow-auto flex-1 relative dark:bg-slate-900 bg-slate-100 rounded-2xl"
	>
		<table class="relative min-w-full">
			<thead class="sticky top-0 dark:bg-slate-900 bg-slate-100 z-2">
				<tr>
					<th></th>
					{#each Object.keys(days).toSorted() as day}
						<th class="p-4 text-center text-xl">
							{day}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody class="h-full w-full relative">
				<tr class="w-full h-full">
					<td class="sticky left-0 dark:bg-slate-900 bg-slate-100 z-1 text-right">
						{#each hours as y}
							<div class="relative py-2">
								<span class="dark:bg-slate-900 bg-slate-100 px-2 z-1">
									{y % 24}h00
								</span>
								<span
									class="absolute top-1/2 block left-8 opacity-5 -z-1 border border-top w-screen"
								>
								</span>
							</div>
						{/each}
					</td>
					{#each Object.values(days).toSorted() as events}
						<td class="relative w-full">
							{#each events as event}
								<div
									style="height: {calcHeight( event )}; top: {calcTop( event )}"
									class=" absolute overflow-hidden rounded-2xl z-0 bg-blue-500 inset-x-1"
								>
									<div class="p-2 w-full h-full">
										{event.description}
									</div>
								</div>
							{/each}
						</td>
					{/each}
				</tr>
			</tbody>
		</table>
	</div>
</div>
