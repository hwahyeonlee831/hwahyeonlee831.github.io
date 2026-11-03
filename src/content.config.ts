import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 블로그 글: src/content/posts/<slug>.md 또는 src/content/posts/<slug>/index.md (이미지를 같은 폴더에 둘 때)
const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
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
			// true면 로컬(npm run dev)에서만 보이고 배포 빌드에서는 빠집니다.
			draft: z.boolean().default(false),
		}),
});

// 프로젝트: src/content/projects/<slug>.md 또는 <slug>/index.md
const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
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
