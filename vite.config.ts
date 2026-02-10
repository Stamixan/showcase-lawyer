import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Forces HMR restart
export default defineConfig({

	plugins: [tailwindcss(), sveltekit()],

	server: {

		fs: {

			allow: ['convex']

		}

	}

});
