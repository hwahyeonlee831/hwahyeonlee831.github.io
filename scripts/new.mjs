// Usage: npm run new:post -- <slug> | npm run new:project -- <slug>
// New drafts start in review/ (gitignored, dev-only); `npm run approve -- <slug>` publishes them.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [kind, slug] = process.argv.slice(2);
if (!['post', 'project'].includes(kind) || !slug) {
	console.error('사용법: npm run new:post -- <주소>  또는  npm run new:project -- <주소>');
	process.exit(1);
}
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
	console.error('주소는 영문 소문자, 숫자, 하이픈(-)만 쓸 수 있습니다. 예: blender-rigging-notes');
	process.exit(1);
}

const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date());
const collection = kind === 'post' ? 'posts' : 'projects';
const dir = join('review', collection, slug);
for (const existing of [dir, join('src/content', collection, slug)]) {
	if (existsSync(existing)) {
		console.error(`이미 있습니다: ${existing}`);
		process.exit(1);
	}
}

const templates = {
	post: `---
title: ''
description: ''
pubDate: '${today}'
category: log # log(작업 기록) | study(학습 노트) | wip(중간 결과물)
tags: []
# heroImage: './cover.png'
# project: 프로젝트-주소
draft: true
---

`,
	project: `---
title: ''
description: ''
period: '${today.slice(0, 7).replace('-', '.')} – 진행 중'
status: ongoing # ongoing | done
role: ''
tools: []
# cover: './cover.png'
links: []
featured: false
order: 100
draft: true
---

## Overview

## Highlights

## Retrospective
`,
};

mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'index.md'), templates[kind]);
console.log(`만들었습니다: ${join(dir, 'index.md')}`);
console.log('검토용 폴더라 저장소에 올라가지 않고 npm run dev 에서만 보입니다.');
console.log(`검토가 끝나면: npm run approve -- ${slug}`);
