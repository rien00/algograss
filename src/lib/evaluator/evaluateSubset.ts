import { makeEvaluation, normalizeCode } from "./normalizeCode";
import type { EvaluationResult } from "@/types/submission";

export function evaluateSubset(code: string): EvaluationResult {
  const { loose } = normalizeCode(code);
  const recursiveCalls = code.match(/subset\s*\([^)]*depth\s*\+\s*1[^)]*\)/gi)?.length ?? 0;
  const checks = [
    {
      name: "종료 조건",
      passed: /if\s*\([^)]*depth\s*==\s*n[^)]*\)/.test(loose),
      feedback: "모든 원소를 판단한 depth == N 종료 조건이 필요합니다.",
      critical: true,
    },
    {
      name: "선택 분기",
      passed: /selected\s*\[\s*depth\s*\]\s*=\s*true/.test(loose),
      feedback: "현재 원소를 선택하는 분기가 필요합니다.",
      critical: true,
    },
    {
      name: "비선택 분기",
      passed: /selected\s*\[\s*depth\s*\]\s*=\s*false/.test(loose),
      feedback: "현재 원소를 선택하지 않는 분기가 필요합니다.",
      critical: true,
    },
    {
      name: "두 번의 재귀 호출",
      passed: recursiveCalls >= 2,
      feedback: "선택한 경우와 선택하지 않은 경우 각각 subset(depth + 1)을 호출해야 합니다.",
      critical: true,
    },
  ];

  return makeEvaluation(checks, "부분집합의 선택/비선택 두 갈래 재귀 흐름이 잘 표현되어 있습니다.");
}
