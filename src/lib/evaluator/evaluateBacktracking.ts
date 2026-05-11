import { makeEvaluation, normalizeCode } from "./normalizeCode";
import type { EvaluationResult } from "@/types/submission";

export function evaluateBacktracking(code: string): EvaluationResult {
  const { compact, loose } = normalizeCode(code);
  const checks = [
    {
      name: "종료 조건",
      passed: /if\s*\([^)]*(depth|idx|index|count)\s*==/.test(loose),
      feedback: "탐색을 멈추고 답을 처리할 종료 조건이 필요합니다.",
      critical: true,
    },
    {
      name: "후보 순회 반복문",
      passed: /for\s*\(/.test(loose),
      feedback: "현재 단계에서 가능한 후보들을 순회해야 합니다.",
    },
    {
      name: "가지치기",
      passed: /if\([^)]*\)continue/.test(compact) || /if\(!?isvalid\([^)]*\)\)(continue|return)/.test(compact),
      feedback: "불가능한 후보를 건너뛰는 가지치기 조건이 필요합니다.",
      critical: true,
    },
    {
      name: "선택 처리",
      passed: /(selected|path|answer|visited)\s*\[[^\]]+\]\s*=/.test(loose) || /\.add\s*\(/.test(loose),
      feedback: "재귀 전에 현재 후보를 선택하는 처리가 필요합니다.",
    },
    {
      name: "재귀 호출",
      passed: /backtracking\([^)]*\+1/.test(compact) || /dfs\([^)]*(depth|idx|index|count)\+1/.test(compact),
      feedback: "선택 후 다음 단계로 들어가는 재귀 호출이 필요합니다.",
      critical: true,
    },
    {
      name: "선택 취소",
      passed: /(selected|visited)\s*\[[^\]]+\]\s*=\s*false/.test(loose) || /\.remove\s*\(/.test(loose),
      feedback: "재귀가 끝난 뒤 이전 선택을 되돌려야 다른 후보를 탐색할 수 있습니다.",
      critical: true,
    },
  ];

  return makeEvaluation(checks, "백트래킹의 후보 순회, 가지치기, 선택/취소 흐름이 잘 잡혀 있습니다.");
}
