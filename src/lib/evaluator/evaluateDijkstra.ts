import { makeEvaluation, normalizeCode } from "./normalizeCode";
import type { EvaluationResult } from "@/types/submission";

export function evaluateDijkstra(code: string): EvaluationResult {
  const { compact, loose } = normalizeCode(code);
  const checks = [
    {
      name: "dist INF 초기화",
      passed: /arrays\.fill\(dist,inf\)/.test(compact) || (compact.includes("dist") && compact.includes("inf")),
      feedback: "모든 거리를 INF로 초기화해야 합니다.",
      critical: true,
    },
    {
      name: "시작 거리 0",
      passed: /dist\[start\]=0/.test(compact),
      feedback: "시작점의 거리는 0으로 설정해야 합니다.",
      critical: true,
    },
    {
      name: "PriorityQueue 사용",
      passed: /priorityqueue\s*</.test(loose) || compact.includes("priorityqueue"),
      feedback: "가장 짧은 후보 경로부터 꺼내기 위해 PriorityQueue가 필요합니다.",
      critical: true,
    },
    {
      name: "시작 노드 PQ 삽입",
      passed: /(pq|queue)\.(add|offer)\([^)]*start/.test(compact),
      feedback: "시작 노드를 PriorityQueue에 넣고 탐색을 시작해야 합니다.",
    },
    {
      name: "PQ 반복",
      passed: /while\(!(pq|queue)\.isempty\(\)\)/.test(compact),
      feedback: "PriorityQueue가 빌 때까지 반복해야 합니다.",
      critical: true,
    },
    {
      name: "현재 노드 꺼내기",
      passed: /(pq|queue)\.poll\(\)/.test(compact),
      feedback: "반복마다 현재 최단 후보를 poll로 꺼내야 합니다.",
    },
    {
      name: "오래된 PQ 값 건너뛰기",
      passed: /if\([^)]*(current|cur|now)\.(cost|dist|distance)>dist\[[^\]]+\][^)]*\)continue/.test(compact),
      feedback: "이미 더 짧은 거리로 갱신된 오래된 PQ 항목은 continue로 건너뛰어야 합니다.",
      critical: true,
    },
    {
      name: "인접 노드 순회",
      passed: /for\([^:]+:graph\[[^\]]+\]\)/.test(compact),
      feedback: "현재 노드에서 갈 수 있는 간선을 순회해야 합니다.",
    },
    {
      name: "새 비용 계산",
      passed: /(newcost|nextcost|cost)\s*=.*dist\s*\[[^\]]+\].*\+/.test(compact) || /(newcost|nextcost)\s*=.*\+.*\.(cost|weight|dist)/.test(compact),
      feedback: "현재 거리와 간선 비용을 더해 새 비용을 계산해야 합니다.",
    },
    {
      name: "더 짧을 때 갱신",
      passed: /if\([^)]*(newcost|nextcost|cost)<dist\[[^\]]+\][^)]*\)/.test(compact),
      feedback: "새 비용이 기존 거리보다 짧을 때만 dist를 갱신해야 합니다.",
      critical: true,
    },
    {
      name: "갱신 노드 PQ 삽입",
      passed: /(pq|queue)\.(add|offer)\([^)]*(newcost|nextcost|cost)/.test(compact),
      feedback: "거리 갱신 후 갱신된 노드를 PriorityQueue에 다시 넣어야 합니다.",
    },
  ];

  return makeEvaluation(checks, "다익스트라의 우선순위 큐, 거리 갱신, 오래된 값 건너뛰기 흐름이 좋습니다.");
}
