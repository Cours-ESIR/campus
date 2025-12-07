export const prerender = false
export const ssr = true

import { Salles } from "$lib/salles.svelte";

export const load = async () => {
    let retour = await Salles.getCal()
    return { retour }
}