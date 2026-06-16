import { makeEvaluation, normalizeCode } from "./normalizeCode";
import type { EvaluationResult } from "@/types/submission";

export function evaluateKruskal(code: string): EvaluationResult {
  const { compact, loose } = normalizeCode(code);
  const checks = [
    {
      name: "간선 정렬",
      passed: /collections\.sort\(/.test(compact) || /arrays\.sort\(/.test(compact) || /edges\.sort\(/.test(compact),
      feedback: "크루스칼은 간선을 비용 기준으로 오름차순 정렬해야 합니다.",
      critical: true,
    },
    {
      name: "간선 순회",
      passed: /for\([^:]+:edges\)/.test(compact) || /for\s*\([^;]+;[^;]+edges/.test(loose),
      feedback: "정렬된 간선을 차례대로 확인하는 반복문이 필요합니다.",
    },
    {
      name: "find 사용",
      passed: /find\(/.test(compact),
      feedback: "두 정점이 이미 같은 집합인지 find로 확인해야 합니다.",
      critical: true,
    },
    {
      name: "사이클 검사",
      passed: /if\([^)]*find\([^)]*\)[!=]=find\([^)]*\)/.test(compact) || /if\([^)]*(root|parent)[^)]*[!=]=[^)]*(root|parent)/.test(compact),
      feedback: "같은 집합이면 선택하지 않고, 다른 집합일 때만 간선을 선택해야 합니다.",
      critical: true,
    },
    {
      name: "union 사용",
      passed: /union\(/.test(compact),
      feedback: "선택한 간선의 두 정점을 union으로 합쳐야 합니다.",
      critical: true,
    },
    {
      name: "가중치 누적",
      passed: /(answer|result|total|cost|sum)\+=.*\.(cost|weight|w)/.test(compact) || /(answer|result|total|cost|sum)\+=\w+/.test(compact),
      feedback: "선택한 간선의 비용을 MST 비용에 누적해야 합니다.",
    },
    {
      name: "간선 수 종료",
      passed: /if\([^)]*(count|cnt)[^)]*==[^)]*(v|n)\-1[^)]*\)(break|return)/.test(compact),
      feedback: "MST는 V - 1개의 간선을 선택하면 더 탐색하지 않아도 됩니다.",
    },
  ];

  return makeEvaluation(checks, "크루스칼의 간선 정렬, 사이클 검사, union 흐름이 잘 잡혀 있습니다.");
}
