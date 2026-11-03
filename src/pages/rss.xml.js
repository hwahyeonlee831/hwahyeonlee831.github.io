import rss from '@astrojs/rss';
import { CATEGORIES, SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getPosts, url } from '../lib/content';

export async function GET(context) {
	const posts = await getPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: new URL(import.meta.env.BASE_URL, context.site),
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: [CATEGORIES[post.data.category].label, ...post.data.tags],
			link: url(`/posts/${post.id}/`),
		})),
		customData: '<language>ko-kr</language>',
	});
}
