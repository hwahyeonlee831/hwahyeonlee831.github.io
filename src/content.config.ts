import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 검토 중인 초안은 review/<posts|projects>/ 에 둡니다. 이 폴더는 .gitignore 되어 있어 저장소에 올라가지 않고,
// npm run dev 에서만 읽힙니다. (PROD, not DEV: a shell variable named DEV leaks into import.meta.env.DEV.)
const sources = (kind: 'posts' | 'projects') => [
	`src/content/${kind}/**/*.{md,mdx}`,
	...(import.meta.env.PROD ? [] : [`review/${kind}/**/*.{md,mdx}`]),
];
// review/posts/foo/index.md 와 src/content/posts/foo/index.md 가 같은 주소(/posts/foo/)가 되도록 폴더 이름을 id로 씁니다.
const slugOf = ({ entry }: { entry: string }) =>
	entry.replace(/^(src\/content|review)\/[^/]+\//, '').replace(/(\/index)?\.mdx?$/, '');

// 블로그 글: src/content/posts/<slug>.md 또는 src/content/posts/<slug>/index.md (이미지를 같은 폴더에 둘 때)
const posts = defineCollection({
	loader: glob({ pattern: sources('posts'), generateId: slugOf }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			category: z.enum(['log', 'study', 'wip']),
			tags: z.array(z.string()).default([]),
			heroImage: image().optional(),
			// 프로젝트와 연결 (src/content/projects 의 파일명)
			project: reference('projects').optional(),
			// 연재 편 번호. 있으면 같은 project 안에서 이 순서로 묶어 "N편"으로 보여 줍니다.
			part: z.number().int().positive().optional(),
			// true면 화면에 DRAFT 표시. review/ 폴더의 초안은 이 값과 관계없이 배포되지 않습니다.
			draft: z.boolean().default(false),
		}),
});

// 프로젝트: src/content/projects/<slug>.md 또는 <slug>/index.md
const projects = defineCollection({
	loader: glob({ pattern: sources('projects'), generateId: slugOf }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			period: z.string(),
			status: z.enum(['ongoing', 'done']).default('done'),
			role: z.string().optional(),
			tools: z.array(z.string()).default([]),
			cover: image().optional(),
			links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
			featured: z.boolean().default(false),
			// 숫자가 작을수록 먼저 표시
			order: z.number().default(100),
			draft: z.boolean().default(false),
		}),
});

export const collections = { posts, projects };
