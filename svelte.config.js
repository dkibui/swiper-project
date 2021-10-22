/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-node';
const config = {
	kit: {
		target: '#svelte',
		adapter: adapter({
			// default options are shown
			out: 'build',
			precompress: false,
			env: {
				host: 'HOST',
				port: 'PORT'
			}
		})
	}
};

export default config;
