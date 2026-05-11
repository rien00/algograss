import { makeEvaluation, normalizeCode } from "./normalizeCode";
import type { EvaluationResult } from "@/types/submission";

export function evaluateBfs(code: string): EvaluationResult {
  const { compact, loose } = normalizeCode(code);
  const checks = [
    {
      name: "Queue 사용",
      passed: /queue\s*</.test(loose) || compact.includes("queue"),
      feedback: "BFS는 먼저 들어온 노드부터 처리해야 하므로 Queue를 사용해야 합니다.",
      critical: true,
    },
    {
      name: "시작점 방문 처리",
      passed: /visited\[start\]=true/.test(compact),
      feedback: "시작점은 큐에 넣을 때 바로 방문 처리해야 합니다.",
      critical: true,
    },
    {
      name: "시작점 큐 삽입",
      passed: /queue\.(add|offer)\(start\)/.test(compact),
      feedback: "탐색을 시작하려면 시작점을 큐에 넣어야 합니다.",
    },
    {
      name: "큐가 빌 때까지 반복",
      passed: /while\(!queue\.isempty\(\)\)/.test(compact),
      feedback: "queue가 빌 때까지 while 문으로 탐색해야 합니다.",
      critical: true,
    },
    {
      name: "현재 노드 꺼내기",
      passed: /queue\.poll\(\)/.test(compact),
      feedback: "각 반복에서 queue.poll()로 현재 노드를 꺼내야 합니다.",
      critical: true,
    },
    {
      name: "인접 노드 순회",
      passed: /for\([^:]+:graph\[[^\]]+\]\)/.test(compact) || /for\([^;]+;[^;]+graph\[[^\]]+\]/.test(compact),
      feedback: "현재 노드의 인접 노드를 순회해야 합니다.",
    },
    {
      name: "미방문 노드 처리",
      passed: /if\(!visited\[[^\]]+\]\)/.test(compact),
      feedback: "아직 방문하지 않은 인접 노드만 큐에 넣어야 합니다.",
    },
    {
      name: "다음 노드 방문 후 큐 삽입",
      passed: /visited\[[^\]]*(next|nxt|neighbor|to|i)[^\]]*\]=true.*queue\.(add|offer)\((next|nxt|neighbor|to|i)\)/.test(compact),
      feedback: "다음 노드는 큐에 넣기 전에 visited[next] = true로 표시해야 중복 삽입을 막을 수 있습니다.",
      critical: true,
    },
  ];

  return makeEvaluation(checks, "BFS의 큐 기반 레벨 탐색 흐름이 잘 잡혀 있습니다.");
}
