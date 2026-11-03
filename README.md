# 작업 일지

작업 기록 · 학습 노트 · 중간 결과물 · 프로젝트를 올리는 개인 블로그. [Astro](https://astro.build) 정적 사이트이고 GitHub Pages로 배포됩니다.

## 로컬에서 보기

```bash
npm install
npm run dev        # http://localhost:4321 (draft 글도 보임)
npm run build      # dist/ 에 배포용 빌드 (draft 제외)
npm run preview    # 빌드 결과 미리보기
```

## 글 쓰기

```bash
npm run new:post -- blender-rigging-notes     # src/content/posts/blender-rigging-notes/index.md
npm run new:project -- janggi-battle          # src/content/projects/janggi-battle/index.md
```

- 새로 만든 파일은 `draft: true` 로 시작합니다. 다 쓰면 그 줄을 지우거나 `false` 로 바꾸세요.
- `category`: `log`(작업 기록) · `study`(학습 노트) · `wip`(중간 결과물)
- 이미지는 글 폴더에 같이 넣고 `![설명](./image.png)` 로 첨부합니다.
- 글에 `project: <프로젝트 폴더 이름>` 을 적으면 프로젝트 상세 페이지에 "이 프로젝트의 기록"으로 모입니다.
- 프로젝트 중 `featured: true` 인 항목이 홈 화면에 먼저 나옵니다.
- 자세한 예시는 `src/content/posts/writing-guide/index.md` (draft라서 로컬에서만 보임).

## 사이트 정보 수정

| 바꿀 것 | 파일 |
| --- | --- |
| 블로그 이름, 소개 문구, 이름, SNS 링크, 분류 이름 | `src/consts.ts` |
| 소개 페이지 | `src/pages/about.astro` |
| 색상, 글꼴 | `src/styles/global.css` |
| 파비콘 / 공유 미리보기 기본 이미지 | `public/favicon.svg`, `public/og-default.png` |

## 배포 (GitHub Pages)

처음 한 번만:

1. GitHub에서 새 **Public** 저장소를 만듭니다.
   - 이름을 `<아이디>.github.io` 로 하면 주소가 `https://<아이디>.github.io/` 가 됩니다. (추천)
   - 다른 이름(예: `blog`)이면 `https://<아이디>.github.io/blog/` 가 됩니다.
2. 이 폴더를 그 저장소에 push 합니다.
   ```bash
   git remote add origin https://github.com/<아이디>/<저장소>.git
   git push -u origin main
   ```
3. 저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 바꿉니다.
4. **Actions** 탭에서 "Deploy to GitHub Pages" 를 다시 실행하거나, 아무 커밋이나 push 하면 배포됩니다.

이후로는 `main` 에 push 할 때마다 자동으로 배포됩니다. 주소와 하위 경로는 워크플로가 자동으로 넣어주므로 설정 파일을 고칠 필요가 없습니다.
