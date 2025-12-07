export const prerender = false
export const ssr = true

import { Cours } from "$lib/files.svelte";

export const load = async ({ params }) => {
    return { cours : await Cours.getByKey(params.key) }
}