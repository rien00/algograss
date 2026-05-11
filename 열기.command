#!/bin/zsh
cd "/Users/castlehouse/Documents/Codex/2026-05-11/1-algograss-dfs-bfs-java-github"

echo "AlgoGrass를 실행합니다."
echo "브라우저가 자동으로 열리지 않으면 아래 주소로 들어가세요."
echo "http://localhost:3000"
echo ""

if [ ! -d "node_modules" ]; then
  echo "node_modules가 없어서 의존성을 먼저 설치합니다."
  npm install
fi

echo "이미 실행 중인 AlgoGrass 개발 서버를 정리합니다."
pkill -f "next dev" 2>/dev/null || true
sleep 1

echo "Next.js 개발 캐시를 새로 만듭니다."
rm -rf .next

(sleep 5 && open "http://localhost:3000") &
npm run dev -- -H 127.0.0.1
