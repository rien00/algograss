# AlgoGrass

알고리즘 핵심 Java 코드를 매일 작성하고, 구조 기반 피드백으로 학습 기록을 남기는 연습용 웹앱입니다.

## 공유용 주소

공식 공유 주소는 `algograss.com`을 기준으로 사용합니다.

공유 링크:

```text
https://algograss.com
```

`.com` 도메인은 구매와 DNS 연결이 필요합니다. 도메인 연결 전에는 Vercel이 제공하는 기본 주소를 임시로 사용하면 됩니다.

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 접속:

```text
http://localhost:3000
```

## 배포 전 확인

```bash
npm run typecheck
npm test
npm run build
```

## Vercel 배포

1. 이 폴더를 GitHub 저장소로 올립니다.
2. Vercel에서 새 프로젝트를 만들고 이 저장소를 선택합니다.
3. Project Name을 `algograss`로 설정합니다.
4. Framework Preset은 Next.js를 사용합니다.
5. Build Command는 `npm run build` 그대로 둡니다.
6. 배포가 끝나면 Vercel의 Domains 메뉴에서 `algograss.com`을 연결합니다.

## 데이터 저장 방식

초기 MVP는 서버 없이 각 사용자 브라우저의 `localStorage`에 제출 기록을 저장합니다.
그래서 링크를 공유해도 사람마다 자기 브라우저 안에서 독립적으로 잔디와 제출 기록이 쌓입니다.
