import { universities, universityToGeojsonFeatureCollection } from "@cours-esir/salles_module"

export const prerender = true
export const ssr = true

export const load = async () => {
    let layers = universities.map(universityToGeojsonFeatureCollection)
    return { layers }
}