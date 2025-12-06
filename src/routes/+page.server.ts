export const prerender = false
export const ssr = true

import { salles } from "$lib/salles.svelte";

export const load = async () => {
    let retour = await salles.getCal()
    return { retour }
}