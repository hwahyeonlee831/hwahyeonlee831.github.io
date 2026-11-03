import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Project = CollectionEntry<'projects'>;

// Drafts show up in `npm run dev` but never in the production build.
// (PROD, not DEV: a shell variable named DEV leaks into import.meta.env.DEV.)
const isVisible = ({ data }: { data: { draft: boolean } }) => !import.meta.env.PROD || !data.draft;

export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('posts', isVisible);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getProjects(): Promise<Project[]> {
	const projects = await getCollection('projects', isVisible);
	return projects.sort(
		(a, b) => a.data.order - b.data.order || (a.data.status === 'ongoing' ? -1 : 1),
	);
}

export function getAllTags(posts: Post[]): [string, number][] {
	const counts = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
	}
	return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko'));
}

// Korean prose reads at roughly 500 characters per minute.
export function readingMinutes(body = ''): number {
	const text = body.replace(/```[\s\S]*?```/g, '').replace(/[#>*_`\-\[\]\(\)!]/g, '');
	return Math.max(1, Math.round(text.replace(/\s+/g, '').length / 500));
}

// Prefix internal links with the deploy base path (e.g. /blog on a project GitHub Pages site).
export function url(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
