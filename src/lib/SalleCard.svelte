<script lang="ts">
	import { salleLibres } from "@cours-esir/salles_module";
	import Icons from "./Icons.svelte";

	export let salle: String;
	export let salleInfo;
    export let date : Date
    let { until, state, error } = salleLibres(salleInfo.events, date)

	function stringify_date(date: Date) {
		if (date == undefined) return "updating";
		return date.toLocaleString("fr");
	}
</script>

<a href="/salle/{salleInfo.id}">
	{#if error}
		<div>
			<p>🔴 {error}</p>
			<h3>{salle}</h3>

			<br />
			<br />
		</div>
	{:else}
		<div>
			<p>
				<Icons
					color={state == "Libre" ? "var(--green)" : "var(--red)"}
					name="circle"
					width="16"
				></Icons>
				{state}
			</p>
			<h3>{salle}</h3>

			<br />
			<p>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M18.6214 2.55029L21.4498 5.37872L20.0356 6.79293L17.2071 3.96451L18.6214 2.55029Z"
						fill="currentColor"
					/><path
						d="M12.8225 8.60055H10.8225V12.6005H12.8225V8.60055Z"
						fill="currentColor"
					/><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M5.18633 18.8137C8.70105 22.3285 14.3995 22.3285 17.9143 18.8137C21.429 15.299 21.429 9.60055 17.9143 6.08583C14.3995 2.57111 8.70105 2.57111 5.18633 6.08583C1.67161 9.60054 1.67161 15.299 5.18633 18.8137ZM6.60054 17.3995C9.33422 20.1332 13.7664 20.1332 16.5 17.3995C19.2337 14.6659 19.2337 10.2337 16.5 7.50004C13.7664 4.76637 9.33422 4.76637 6.60054 7.50004C3.86688 10.2337 3.86688 14.6659 6.60054 17.3995Z"
						fill="currentColor"
					/></svg
				>
				Jusqu'au {stringify_date(until)}
			</p>
		</div>
	{/if}
</a>

<style>
	div {
		background-color: var(--secondary);
		padding: 16px;
		border-radius: 16px;
		display: flex;
		flex-direction: column;
	}

	h3,
	p {
		margin: 0;
	}

	p {
		font-weight: 200;
		display: flex;
		align-items: center;
		gap: 8px;
		opacity: 0.7;
	}

	a[href] {
		all: unset;
		cursor: pointer;
		user-select: none;
		-webkit-user-drag: none;
		color: var(--text);
		/* max-width: 300px; */
		/* flex: 300px 1; */
	}
</style>
