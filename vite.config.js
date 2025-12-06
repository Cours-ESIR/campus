import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import pkg from "./package.json"

export default defineConfig({
	define: {
		PACKAGES: pkg.devDependencies
	},
	plugins: [tailwindcss(), sveltekit()]
});
