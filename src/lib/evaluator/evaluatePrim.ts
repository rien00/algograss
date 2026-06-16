import { makeEvaluation, normalizeCode } from "./normalizeCode";
import type { EvaluationResult } from "@/types/submission";

export function evaluatePrim(code: string): EvaluationResult {
  const { compact } = normalizeCode(code);
  const checks = [
    {
      name: "PriorityQueue 사용",
      passed: /priorityqueue</.test(compact) || compact.includes("priorityqueue"),
      feedback: "프림은 현재 연결 가능한 간선 중 최소 비용을 고르기 위해 PriorityQueue를 사용합니다.",
      critical: true,
    },
    {
      name: "시작 정점 삽입",
      passed: /(pq|queue)\.(add|offer)\([^)]*(start|0|1)/.test(compact),
      feedback: "시작 정점을 우선순위 큐에 넣고 MST 확장을 시작해야 합니다.",
    },
    {
      name: "PQ 반복",
      passed: /while\(!(pq|queue)\.isempty\(\)\)/.test(compact),
      feedback: "PriorityQueue가 빌 때까지 후보 간선을 꺼내며 탐색해야 합니다.",
      critical: true,
    },
    {
      name: "현재 후보 꺼내기",
      passed: /(pq|queue)\.poll\(\)/.test(compact),
      feedback: "반복마다 poll()로 가장 비용이 작은 후보를 꺼내야 합니다.",
    },
    {
      name: "방문 정점 건너뛰기",
      passed: /if\(visited\[[^\]]+\]\)(continue|return)/.test(compact),
      feedback: "이미 MST에 포함된 정점은 continue로 건너뛰어야 합니다.",
      critical: true,
    },
    {
      name: "방문 처리",
      passed: /visited\[[^\]]+\]=true/.test(compact),
      feedback: "선택한 정점을 MST에 포함했다는 방문 처리가 필요합니다.",
      critical: true,
    },
    {
      name: "비용 누적",
      passed: /(answer|result|total|cost|sum)\+=.*\.(cost|weight|w)/.test(compact) || /(answer|result|total|cost|sum)\+=\w+/.test(compact),
      feedback: "선택된 간선의 비용을 MST 결과에 누적해야 합니다.",
    },
    {
      name: "인접 간선 추가",
      passed: /for\([^:]+:graph\[[^\]]+\]\)/.test(compact) && /(pq|queue)\.(add|offer)\(/.test(compact),
      feedback: "현재 정점의 인접 간선 중 다음 후보를 PriorityQueue에 넣어야 합니다.",
    },
  ];

  return makeEvaluation(checks, "프림의 우선순위 큐 기반 MST 확장 흐름이 잘 표현되어 있습니다.");
}
