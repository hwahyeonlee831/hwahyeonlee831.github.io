// 사이트 전역 정보. 이 파일만 고치면 헤더·푸터·메타태그·RSS에 모두 반영됩니다.

export const SITE_TITLE = '작업 일지';
export const SITE_DESCRIPTION = '작업하며 배운 것, 만들고 있는 것, 만든 것을 기록합니다.';
export const AUTHOR = 'bella';

// href가 빈 문자열인 항목은 화면에 표시되지 않습니다.
export const SOCIAL_LINKS: { label: string; href: string }[] = [
	{ label: 'GitHub', href: '' },
	{ label: 'Email', href: '' },
	{ label: 'Instagram', href: '' },
];

// 글 분류. key는 frontmatter의 category 값과 URL(/posts/category/<key>)에 쓰입니다.
export const CATEGORIES = {
	log: { label: '작업 기록', description: '프로젝트를 진행하며 남긴 과정과 회고' },
	study: { label: '학습 노트', description: '업무와 공부 중에 배운 것 정리' },
	wip: { label: '중간 결과물', description: '아직 진행 중인 작업물 공유' },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
