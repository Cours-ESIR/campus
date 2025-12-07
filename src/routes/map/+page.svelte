<script lang="ts">
	import "maplibre-gl/dist/maplibre-gl.css";
	import maplibregl from "maplibre-gl";
	import { onMount } from "svelte";
	import SearchBar from "$lib/SearchBar.svelte";

	function changelayer(event, map) {
		if (event.matches) {
			map.setLayoutProperty("dark-layer", "visibility", "visible");
			map.setLayoutProperty("light-layer", "visibility", "none");
		} else {
			map.setLayoutProperty("dark-layer", "visibility", "none");
			map.setLayoutProperty("light-layer", "visibility", "visible");
		}
	}

	let { data } = $props();
	let { layers } = data;

	let map: maplibregl.Map | undefined = $state();

	onMount(async () => {
		map = new maplibregl.Map({
			container: "map",
			style: {
				version: 8,
				sources: {
					dark: {
						type: "raster",
						tiles: [
							"https://a.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png",
						],
						tileSize: 256,
					},
					light: {
						type: "raster",
						tiles: [
							"https://a.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png",
						],
						tileSize: 256,
					},
				},
				layers: [
					{
						id: "light-layer",
						type: "raster",
						source: "light",
						layout: {
							visibility: "none",
						},
					},
					{
						id: "dark-layer",
						type: "raster",
						source: "dark",
						layout: {
							visibility: "none",
						},
					},
				],
			},
			center: [-1.638, 48.119],
			zoom: 15,
			maxZoom: 18,
			minZoom: 14,
		});

		map.on("load", (obj) => {
			let map = obj.target;
			for (let data of layers) {
				map.addSource(data.name, {
					type: "geojson",
					data,
				});

				map.addLayer({
					source: data.name,
					id: `${data.name}-layer`,
					type: "fill-extrusion",
					paint: {
						"fill-extrusion-color": "#2265cc", // ['get', 'color'] ['get','Z_MIN_SOL']
						"fill-extrusion-base": 0,
						"fill-extrusion-height": 16, // ['+', ['get','HAUTEUR'], 0]
						"fill-extrusion-opacity": 1,
					},
				});

				for (let it of data.features) {
					const el = document.createElement("div");

					el.className = "marker";
					el.style.height = "30px";
					el.style.width = "30px";

					if (it.properties.kind === "building") {
						el.innerHTML = `<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
							<circle cx="15" cy="15" r="15" fill="white"/>
							<text font-size="15" color="black" text-anchor="middle" x="15" y="20">${it.properties.shortname}</text>    
						</svg>`;
					} else if (it.properties.kind === "restaurant") {
						el.innerHTML = `<svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="500" cy="500" r="500" fill="white"/><path d="M692 244C676 244 564 276 564 420V532C564 567.3 592.7 596 628 596H660V724C660 741.7 674.3 756 692 756C709.7 756 724 741.7 724 724V596V484V276C724 258.3 709.7 244 692 244ZM340 260C340 251.8 333.9 245 325.7 244.1C317.5 243.2 310.2 248.6 308.4 256.5L278.1 392.8C276.7 399.1 276 405.5 276 411.9C276 457.8 311.1 495.5 356 499.6V724C356 741.7 370.3 756 388 756C405.7 756 420 741.7 420 724V499.6C464.9 495.5 500 457.8 500 411.9C500 405.5 499.3 399.1 497.9 392.8L467.6 256.5C465.8 248.5 458.3 243.2 450.2 244.1C442.1 245 436 251.8 436 260V394.2C436 399.6 431.6 404 426.2 404C421.1 404 416.9 400.1 416.4 395L403.9 258.6C403.2 250.3 396.3 244 388 244C379.7 244 372.8 250.3 372.1 258.6L359.7 395C359.2 400.1 355 404 349.9 404C344.5 404 340.1 399.6 340.1 394.2V260H340ZM388.3 412H388H387.7L388 411.3L388.3 412Z" fill="black"/></svg>`;
					} else if (it.properties.kind === "library") {
						el.innerHTML = `<svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="500" cy="500" r="500" fill="white"/><g clip-path="url(#clip0_1920_6)"><path d="M372 244C319 244 276 287 276 340V660C276 713 319 756 372 756H660H692C709.7 756 724 741.7 724 724C724 706.3 709.7 692 692 692V628C709.7 628 724 613.7 724 596V276C724 258.3 709.7 244 692 244H660H372ZM372 628H628V692H372C354.3 692 340 677.7 340 660C340 642.3 354.3 628 372 628ZM404 388C404 379.2 411.2 372 420 372H612C620.8 372 628 379.2 628 388C628 396.8 620.8 404 612 404H420C411.2 404 404 396.8 404 388ZM420 436H612C620.8 436 628 443.2 628 452C628 460.8 620.8 468 612 468H420C411.2 468 404 460.8 404 452C404 443.2 411.2 436 420 436Z" fill="black"/></g><defs><clipPath id="clip0_1920_6"><rect width="448" height="512" fill="white" transform="translate(276 244)"/></clipPath></defs></svg>`;
					}
					
					let a = it.properties.bounds[0];
					let b = it.properties.bounds[1];
					let m = new maplibregl.Marker({ element: el }).setLngLat([
						(a[0] + b[0]) / 2,
						(a[1] + b[1]) / 2,
					]);
					m.addTo(map);
				}
			}
		});

		map.addControl(new maplibregl.FullscreenControl(), "bottom-right");

		map.on("idle", () => {
			let query = window.matchMedia("(prefers-color-scheme: dark)");
			changelayer(query, map);
			query.addEventListener("change", (e) => changelayer(e, map));
		});
	});
</script>

<div class="w-full h-full relative text-slate-50">
	<SearchBar {map} {layers}></SearchBar>
	<div id="map" class="w-full h-full absolute"></div>
</div>
