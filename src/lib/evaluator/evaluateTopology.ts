import { makeEvaluation, normalizeCode } from "./normalizeCode";
import type { EvaluationResult } from "@/types/submission";

export function evaluateTopology(code: string): EvaluationResult {
  const { compact } = normalizeCode(code);
  const checks = [
    {
      name: "진입차수 배열 사용",
      passed: /indegree/.test(compact),
      feedback: "위상정렬은 각 정점의 진입차수 배열을 관리해야 합니다.",
      critical: true,
    },
    {
      name: "Queue 사용",
      passed: /queue</.test(compact) || compact.includes("queue"),
      feedback: "진입차수가 0인 정점을 처리하기 위해 Queue를 사용합니다.",
      critical: true,
    },
    {
      name: "0 진입차수 시작 삽입",
      passed: /if\(indegree\[[^\]]+\]==0\)/.test(compact) && /(queue|q)\.(add|offer)\(/.test(compact),
      feedback: "처음에 진입차수가 0인 정점을 큐에 넣어야 합니다.",
      critical: true,
    },
    {
      name: "큐 반복",
      passed: /while\(!(queue|q)\.isempty\(\)\)/.test(compact),
      feedback: "큐가 빌 때까지 정점을 꺼내며 순서를 만들어야 합니다.",
      critical: true,
    },
    {
      name: "현재 정점 꺼내기",
      passed: /(queue|q)\.poll\(\)/.test(compact),
      feedback: "queue.poll()로 현재 정점을 꺼내야 합니다.",
    },
    {
      name: "인접 노드 순회",
      passed: /for\([^:]+:graph\[[^\]]+\]\)/.test(compact),
      feedback: "현재 정점에서 나가는 간선을 따라 인접 노드를 순회해야 합니다.",
    },
    {
      name: "진입차수 감소",
      passed: /indegree\[[^\]]+\]--/.test(compact) || /--indegree\[[^\]]+\]/.test(compact) || /indegree\[[^\]]+\]-=1/.test(compact),
      feedback: "현재 정점을 제거했으므로 다음 정점의 진입차수를 1 줄여야 합니다.",
      critical: true,
    },
    {
      name: "감소 후 0이면 큐 삽입",
      passed: /if\(indegree\[[^\]]+\]==0\)[\s\S]*(queue|q)\.(add|offer)\(/.test(compact),
      feedback: "진입차수가 0이 된 정점은 큐에 넣어야 합니다.",
      critical: true,
    },
  ];

  return makeEvaluation(checks, "위상정렬의 진입차수, 큐 처리, 감소 후 삽입 흐름이 잘 잡혀 있습니다.");
}
