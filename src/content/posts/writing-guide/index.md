---
title: '글 작성 가이드'
description: '새 글을 쓰고, 이미지를 넣고, 프로젝트와 연결하는 방법. draft라서 로컬에서만 보입니다.'
pubDate: '2026-11-02'
category: study
tags: ['가이드', 'markdown']
project: example-project
draft: true
---

이 글은 `draft: true` 라서 **로컬(`npm run dev`)에서만 보이고 배포된 사이트에는 나오지 않습니다.**
참고용으로 남겨두거나, 필요 없으면 `src/content/posts/writing-guide` 폴더를 지우면 됩니다.

## 새 글 만들기

```bash
npm run new:post -- my-first-note
```

`src/content/posts/my-first-note/index.md` 가 만들어집니다. 폴더 이름이 곧 주소(`/posts/my-first-note/`)가 됩니다.

## frontmatter

```yaml
---
title: '글 제목'
description: '목록과 공유 미리보기에 보이는 한두 줄 요약'
pubDate: '2026-11-03'
updatedDate: '2026-11-10'   # 선택: 수정한 날짜
category: study             # log(작업 기록) | study(학습 노트) | wip(중간 결과물)
tags: ['Blender', '리깅']
heroImage: './cover.png'    # 선택: 글 상단 대표 이미지 (공유 미리보기에도 쓰임)
project: janggi-battle      # 선택: 포트폴리오 프로젝트와 연결
draft: false                # true면 로컬에서만 보임
---
```

## 이미지·영상 넣기

이미지는 글 폴더 안에 같이 두고 상대 경로로 넣습니다. 빌드할 때 자동으로 최적화됩니다.

```md
![캐릭터 정면 렌더](./render-front.png)
```

영상(mp4)은 `public/media/` 에 두고 HTML 태그로 넣습니다. (저장소 이름이 `<아이디>.github.io` 가 아니면 경로 앞에 `/<저장소이름>` 을 붙여야 합니다.)

```html
<video src="/media/turntable.mp4" controls muted loop></video>
```

## 코드 블록

```ts
function greet(name: string) {
	return `안녕하세요, ${name}`;
}
```

> 인용문은 이렇게 보입니다.

| 항목 | 내용 |
| --- | --- |
| 표 | 이렇게 들어갑니다 |
