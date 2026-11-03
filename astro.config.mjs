// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// SITE_URL / BASE_PATH are injected by the GitHub Pages workflow
// (.github/workflows/deploy.yml), so nothing needs editing here when the repo name changes.
export default defineConfig({
	site: process.env.SITE_URL || 'http://localhost:4321',
	base: process.env.BASE_PATH || '/',
	trailingSlash: 'ignore',
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark' },
			wrap: false,
		},
	},
});
