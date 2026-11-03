// Usage: npm run approve -- <slug>
// Moves a reviewed draft from review/ (gitignored) into src/content/ and drops `draft: true`,
// so the next commit + push publishes it.
import { existsSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const slug = process.argv[2];
if (!slug) {
	console.error('사용법: npm run approve -- <주소>');
	process.exit(1);
}

const found = ['posts', 'projects']
	.map((collection) => ({ collection, from: join('review', collection, slug) }))
	.filter(({ from }) => existsSync(from));

if (found.length === 0) {
	const waiting = ['posts', 'projects'].flatMap((c) =>
		existsSync(join('review', c)) ? readdirSync(join('review', c)).map((s) => `${c}/${s}`) : [],
	);
	console.error(`review/ 에 '${slug}' 가 없습니다.`);
	if (waiting.length) console.error(`검토 대기 중: ${waiting.join(', ')}`);
	process.exit(1);
}
if (found.length > 1) {
	console.error(`'${slug}' 가 posts 와 projects 양쪽에 있습니다. 하나만 남겨주세요.`);
	process.exit(1);
}

const { collection, from } = found[0];
const to = join('src/content', collection, slug);
if (existsSync(to)) {
	console.error(`이미 게시된 같은 주소가 있습니다: ${to}`);
	process.exit(1);
}

renameSync(from, to);
const file = ['index.md', 'index.mdx'].map((f) => join(to, f)).find(existsSync);
if (file) writeFileSync(file, readFileSync(file, 'utf8').replace(/^draft:\s*true\s*\n/m, ''));

console.log(`게시 준비 완료: ${to}`);
console.log('커밋하고 push하면 사이트에 올라갑니다.');
