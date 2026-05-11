import { makeEvaluation, normalizeCode } from "./normalizeCode";
import type { EvaluationResult } from "@/types/submission";

export function evaluateDfs(code: string): EvaluationResult {
  const { compact, loose } = normalizeCode(code);
  const checks = [
    {
      name: "현재 노드 방문 처리",
      passed: /visited\[[^\]]*(current|cur|node|v|start)[^\]]*\]=true/.test(compact),
      feedback: "DFS에 들어온 현재 노드를 먼저 방문 처리해야 합니다.",
      critical: true,
    },
    {
      name: "인접 노드 순회",
      passed: /for\([^:]+:graph\[[^\]]+\]\)/.test(compact) || /for\([^;]+;[^;]+graph\[[^\]]+\]/.test(compact),
      feedback: "현재 노드와 연결된 인접 노드를 순회해야 합니다.",
    },
    {
      name: "미방문 노드 조건",
      passed: /if\(!visited\[[^\]]+\]\)/.test(compact),
      feedback: "이미 방문한 노드는 다시 DFS로 들어가지 않도록 막아야 합니다.",
      critical: true,
    },
    {
      name: "재귀 호출",
      passed: /dfs\((next|nxt|neighbor|to|i)\)/.test(compact) || /dfs\([^)]*graph/.test(compact),
      feedback: "방문하지 않은 인접 노드로 dfs(next)를 호출해야 합니다.",
      critical: true,
    },
  ];

  return makeEvaluation(checks, "DFS의 방문 처리와 인접 노드 재귀 탐색 흐름이 좋습니다.");
}
