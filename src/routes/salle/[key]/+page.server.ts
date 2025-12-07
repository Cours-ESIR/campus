export const prerender = false
export const ssr = true

import { Salles } from "$lib/salles.svelte";

export const load = async ({ params }) => {
    let planning = await Salles.getByKey(params.key)
    return { planning }
}