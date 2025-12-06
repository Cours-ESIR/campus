<script lang="ts">
	import "maplibre-gl/dist/maplibre-gl.css";
	import maplibregl from "maplibre-gl";

	import { onMount } from "svelte";

	function changelayer(event, map) {
		if (event.matches) {
			map.setLayoutProperty("dark-layer", "visibility", "visible");
			map.setLayoutProperty("light-layer", "visibility", "none");
		} else {
			map.setLayoutProperty("dark-layer", "visibility", "none");
			map.setLayoutProperty("light-layer", "visibility", "visible");
		}
	}

	onMount(async () => {
		let geojson = await import("$lib/../includes/geojson.json");
		let def = await import("$lib/../includes/search.ts");

		const map = new maplibregl.Map({
			container: "map",
			projection: "mercator",
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
					geojson: {
						type: "geojson",
						data: geojson,
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
					{
						id: "geojson-layer",
						type: "fill-extrusion",
						source: "geojson", // reference the data source
						paint: {
							"fill-extrusion-color": "#2265cc", // ['get', 'color'] ['get','Z_MIN_SOL']
							"fill-extrusion-base": 0,
							"fill-extrusion-height": 16, // ['+', ['get','HAUTEUR'], 0]
							"fill-extrusion-opacity": 1,
						},
					},
				],
			},
			center: [-1.638, 48.119], // starting position [lng, lat]
			zoom: 15,
			maxZoom: 18,
			minZoom: 14,
		});

		map.addControl(new maplibregl.FullscreenControl(), "bottom-right");

		let ctrl = new def.default(geojson);
		map.addControl(ctrl, "top-left");

		map.on("idle", () => {
			let query = window.matchMedia("(prefers-color-scheme: dark)");
			changelayer(query, map);
			query.addEventListener("change", (e) => changelayer(e, map));
		});

		for (let it of Object.values(geojson.features)) {
			const el = document.createElement("div");

			el.className = "marker";
			el.style.height = "30px";
			el.style.width = "30px";

			let a = it.bounds[0];
			let b = it.bounds[1];

			let m = new maplibregl.Marker({ element: el }).setLngLat([
				(a[0] + b[0]) / 2,
				(a[1] + b[1]) / 2,
			]);

			if (it.properties.name.startsWith("Bâtiment")) {
				el.innerHTML = `
                    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="15" fill="white"/>
                        <text font-size="15" color="black" text-anchor="middle" x="15" y="20">${it.properties.name.replace("Bâtiment", "")}</text>    
                    </svg>`;

				m.addTo(map);
				// el.innerHTML = it.properties.name
			} else if (
				it.properties.name.startsWith("Restaurant") ||
				it.properties.name.startsWith("Café")
			) {
				el.innerHTML = `<svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="500" cy="500" r="500" fill="white"/><path d="M692 244C676 244 564 276 564 420V532C564 567.3 592.7 596 628 596H660V724C660 741.7 674.3 756 692 756C709.7 756 724 741.7 724 724V596V484V276C724 258.3 709.7 244 692 244ZM340 260C340 251.8 333.9 245 325.7 244.1C317.5 243.2 310.2 248.6 308.4 256.5L278.1 392.8C276.7 399.1 276 405.5 276 411.9C276 457.8 311.1 495.5 356 499.6V724C356 741.7 370.3 756 388 756C405.7 756 420 741.7 420 724V499.6C464.9 495.5 500 457.8 500 411.9C500 405.5 499.3 399.1 497.9 392.8L467.6 256.5C465.8 248.5 458.3 243.2 450.2 244.1C442.1 245 436 251.8 436 260V394.2C436 399.6 431.6 404 426.2 404C421.1 404 416.9 400.1 416.4 395L403.9 258.6C403.2 250.3 396.3 244 388 244C379.7 244 372.8 250.3 372.1 258.6L359.7 395C359.2 400.1 355 404 349.9 404C344.5 404 340.1 399.6 340.1 394.2V260H340ZM388.3 412H388H387.7L388 411.3L388.3 412Z" fill="black"/></svg>`;
				m.addTo(map);
			}
		}

		let markers = [
			[[48.11983064878951, -1.6410448433312614], "resto"], // B26
			[[48.123273013829646, -1.6306942287729789], "resto"], // iut
			[[48.122112160209, -1.6375839817504], "resto"], // insa

			[[48.11898960917824, -1.6363456435142263], "biblio"], // biblio b40
			[[48.11578908776368, -1.635894793911378], "biblio"], // biblio b
			[[48.12063475718436, -1.6340607499578876], "biblio"], // biblio insa
		];

		for (const marker of markers) {
			// create a HTML element for each feature
			const el = document.createElement("div");
			el.className = "marker";
			el.style.height = "30px";
			el.style.width = "30px";

			if (marker[1] == "resto") {
				el.innerHTML = `<svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="500" cy="500" r="500" fill="white"/><path d="M692 244C676 244 564 276 564 420V532C564 567.3 592.7 596 628 596H660V724C660 741.7 674.3 756 692 756C709.7 756 724 741.7 724 724V596V484V276C724 258.3 709.7 244 692 244ZM340 260C340 251.8 333.9 245 325.7 244.1C317.5 243.2 310.2 248.6 308.4 256.5L278.1 392.8C276.7 399.1 276 405.5 276 411.9C276 457.8 311.1 495.5 356 499.6V724C356 741.7 370.3 756 388 756C405.7 756 420 741.7 420 724V499.6C464.9 495.5 500 457.8 500 411.9C500 405.5 499.3 399.1 497.9 392.8L467.6 256.5C465.8 248.5 458.3 243.2 450.2 244.1C442.1 245 436 251.8 436 260V394.2C436 399.6 431.6 404 426.2 404C421.1 404 416.9 400.1 416.4 395L403.9 258.6C403.2 250.3 396.3 244 388 244C379.7 244 372.8 250.3 372.1 258.6L359.7 395C359.2 400.1 355 404 349.9 404C344.5 404 340.1 399.6 340.1 394.2V260H340ZM388.3 412H388H387.7L388 411.3L388.3 412Z" fill="black"/></svg>`;
			} else if (marker[1] == "biblio") {
				el.innerHTML = `<svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="500" cy="500" r="500" fill="white"/><g clip-path="url(#clip0_1920_6)"><path d="M372 244C319 244 276 287 276 340V660C276 713 319 756 372 756H660H692C709.7 756 724 741.7 724 724C724 706.3 709.7 692 692 692V628C709.7 628 724 613.7 724 596V276C724 258.3 709.7 244 692 244H660H372ZM372 628H628V692H372C354.3 692 340 677.7 340 660C340 642.3 354.3 628 372 628ZM404 388C404 379.2 411.2 372 420 372H612C620.8 372 628 379.2 628 388C628 396.8 620.8 404 612 404H420C411.2 404 404 396.8 404 388ZM420 436H612C620.8 436 628 443.2 628 452C628 460.8 620.8 468 612 468H420C411.2 468 404 460.8 404 452C404 443.2 411.2 436 420 436Z" fill="black"/></g><defs><clipPath id="clip0_1920_6"><rect width="448" height="512" fill="white" transform="translate(276 244)"/></clipPath></defs></svg>`;
			} else {
				el.innerHTML = `<svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="500" cy="500" r="500" fill="white"/><path d="M500 244C634.4 244 724 279.2 724 324V340V372C741.7 372 756 386.3 756 404V468C756 485.7 741.7 500 724 500V660C724 677.7 709.7 692 692 692V724C692 741.7 677.7 756 660 756H628C610.3 756 596 741.7 596 724V692H404V724C404 741.7 389.7 756 372 756H340C322.3 756 308 741.7 308 724V692C290.3 692 276 677.7 276 660V500C258.3 500 244 485.7 244 468V404C244 386.3 258.3 372 276 372V340V324C276 279.2 365.6 244 500 244ZM340 404V500C340 517.7 354.3 532 372 532H484V372H372C354.3 372 340 386.3 340 404ZM516 532H628C645.7 532 660 517.7 660 500V404C660 386.3 645.7 372 628 372H516V532ZM356 644C364.487 644 372.626 640.629 378.627 634.627C384.629 628.626 388 620.487 388 612C388 603.513 384.629 595.374 378.627 589.373C372.626 583.371 364.487 580 356 580C347.513 580 339.374 583.371 333.373 589.373C327.371 595.374 324 603.513 324 612C324 620.487 327.371 628.626 333.373 634.627C339.374 640.629 347.513 644 356 644ZM644 644C652.487 644 660.626 640.629 666.627 634.627C672.629 628.626 676 620.487 676 612C676 603.513 672.629 595.374 666.627 589.373C660.626 583.371 652.487 580 644 580C635.513 580 627.374 583.371 621.373 589.373C615.371 595.374 612 603.513 612 612C612 620.487 615.371 628.626 621.373 634.627C627.374 640.629 635.513 644 644 644ZM596 324C596 315.2 588.8 308 580 308H420C411.2 308 404 315.2 404 324C404 332.8 411.2 340 420 340H580C588.8 340 596 332.8 596 324Z" fill="black"/></svg>`;
			}
			//
			// make a marker for each feature and add to the map
			let m = new maplibregl.Marker({ element: el })
				.setLngLat(marker[0].reverse())
				.addTo(map);
		}
	});
</script>

<div class="w-full h-full relative">
	<div id="map" class="w-full h-full absolute"></div>
</div>
