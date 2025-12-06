export const prerender = false
export const ssr = true

import { salles } from "$lib/salles.svelte";

export const load = async ({ params }) => {
    let planning = await salles.getByKey(params.key)
    return { planning }
}