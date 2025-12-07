import { Cours } from '$lib/files.svelte.js'

export const load = async ({ fetch }) => {
    return { cours: await Cours.getCours() }
}