import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const site = 'https://papadopoulos-law.gr';
const pages = [
	'', // home
	'about',
	'services',
	'contact',
	'privacy',
	'terms',
	'disclaimer'
];
const langs = ['el', 'en'];

function generateSitemap() {
	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
>
  ${pages
		.flatMap((page) =>
			langs.map((lang) => {
				const path = page ? `/${lang}/${page}` : `/${lang}`;
				
				const alternates = langs.map(l => `
    <xhtml:link
      rel="alternate"
      hreflang="${l}"
      href="${site}/${l}${page ? '/' + page : ''}"
    />`).join('');

				return `
  <url>
    <loc>${site}${path}</loc>
    <changefreq>${page === '' ? 'daily' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.includes('contact') ? '0.9' : '0.8'}</priority>
    ${alternates}
  </url>`;
			})
		)
		.join('')}
</urlset>`;

	const sitemapPath = path.resolve(__dirname, '../static/sitemap.xml');
	fs.writeFileSync(sitemapPath, xml);
	console.log(`✅ Generated sitemap.xml at ${sitemapPath}`);
}

function generateRobots() {
	const txt = `
User-agent: *
Allow: /

# Disallow admin routes
Disallow: /admin
Disallow: /admin/*

Sitemap: https://papadopoulos-law.gr/sitemap.xml
`.trim();

	const robotsPath = path.resolve(__dirname, '../static/robots.txt');
	fs.writeFileSync(robotsPath, txt);
	console.log(`✅ Generated robots.txt at ${robotsPath}`);
}

generateSitemap();
generateRobots();
