export const prerender = true
export const ssr = true

import geojson from "$lib/../includes/geojson.json";

function getBounds(item): [[number, number], [number, number]] {
    let latmax
    let latmin
    let lonmax
    let lonmin

    let geo = item.geometry.type == "MultiPolygon" ? item.geometry.coordinates[0] : item.geometry.coordinates

    for (let liste of geo) {
        for (let coords of liste) {
            if (coords[0] > latmax || latmax === undefined) latmax = coords[0]
            else if (coords[0] < latmin || latmin === undefined) latmin = coords[0]

            if (coords[1] > lonmax || lonmax === undefined) lonmax = coords[1]
            else if (coords[1] < lonmin || lonmin === undefined) lonmin = coords[1]
        }
    }

    return [[latmin, lonmin], [latmax, lonmax]]
}

export const load = async () => {
    for (let item of geojson.features) {
        item.bounds = getBounds(item)
    }

    return { geojson }
}