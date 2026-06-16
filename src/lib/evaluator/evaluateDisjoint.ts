import { makeEvaluation, normalizeCode } from "./normalizeCode";
import type { EvaluationResult } from "@/types/submission";

export function evaluateDisjoint(code: string): EvaluationResult {
  const { compact, loose } = normalizeCode(code);
  const checks = [
    {
      name: "parent 초기화",
      passed: /for\s*\([^;]*(i|idx|index)[^;]*;[^;]+;[^)]*\)[^{;]*\{?[^}]*parent\[(i|idx|index)\]=(i|idx|index)/.test(loose),
      feedback: "각 원소의 parent를 자기 자신으로 초기화해야 합니다.",
      critical: true,
    },
    {
      name: "find 메소드",
      passed: /find\(/.test(compact),
      feedback: "대표 원소를 찾는 find 함수가 필요합니다.",
      critical: true,
    },
    {
      name: "find 종료 조건",
      passed: /if\(parent\[[^\]]+\]==[^\)]*\)(return|[^{}]*return)/.test(compact),
      feedback: "parent[x] == x이면 x를 반환하는 종료 조건이 필요합니다.",
      critical: true,
    },
    {
      name: "경로 압축",
      passed: /parent\[[^\]]+\]=find\(parent\[[^\]]+\]\)/.test(compact),
      feedback: "find에서 parent[x] = find(parent[x]) 형태의 경로 압축을 적용하면 좋습니다.",
    },
    {
      name: "union 메소드",
      passed: /union\(/.test(compact),
      feedback: "두 집합을 합치는 union 함수가 필요합니다.",
      critical: true,
    },
    {
      name: "두 루트 비교",
      passed: /find\([^)]*\).*(find\([^)]*\))/.test(compact) || /(roota|rootb|pa|pb|ra|rb)/.test(compact),
      feedback: "union에서는 두 원소의 대표 루트를 찾고 비교해야 합니다.",
    },
    {
      name: "parent 연결",
      passed: /parent\[[^\]]+\]=[^\]]*(root|parent|pa|pb|ra|rb)/.test(compact),
      feedback: "서로 다른 집합이면 한 루트의 parent를 다른 루트로 연결해야 합니다.",
      critical: true,
    },
  ];

  return makeEvaluation(checks, "Disjoint Set의 parent 초기화, find, union 흐름이 잘 잡혀 있습니다.");
}
