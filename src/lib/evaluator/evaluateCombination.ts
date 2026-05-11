import { makeEvaluation, normalizeCode } from "./normalizeCode";
import type { EvaluationResult } from "@/types/submission";

export function evaluateCombination(code: string): EvaluationResult {
  const { loose } = normalizeCode(code);
  const checks = [
    {
      name: "종료 조건",
      passed: /if\s*\([^)]*depth\s*==\s*(r|selected\.length)[^)]*\)/.test(loose),
      feedback: "depth가 뽑을 개수에 도달했을 때 멈추는 종료 조건이 필요합니다.",
      critical: true,
    },
    {
      name: "start부터 순회",
      passed: /for\s*\([^;]*=\s*start\s*;/.test(loose),
      feedback: "조합은 이전 선택 이후의 후보만 보도록 반복문이 start에서 시작해야 합니다.",
      critical: true,
    },
    {
      name: "선택 처리",
      passed: /selected\s*\[\s*depth\s*\]\s*=/.test(loose),
      feedback: "현재 depth 위치에 선택한 값을 저장해야 합니다.",
    },
    {
      name: "i + 1 재귀",
      passed: /combination\s*\([^)]*i\s*\+\s*1[^)]*,[^)]*depth\s*\+\s*1[^)]*\)/.test(loose),
      feedback: "다음 재귀에는 start + 1이 아니라 현재 선택한 i + 1을 넘겨야 누락이 없습니다.",
      critical: true,
    },
    {
      name: "순열식 visited 흐름 배제",
      passed: !/visited\s*\[[^\]]+\]\s*=\s*true/.test(loose),
      feedback: "조합은 보통 visited 전체 탐색보다 start 인덱스로 중복을 막는 흐름이 적합합니다.",
    },
  ];

  return makeEvaluation(checks, "조합의 start 기반 순회와 i + 1 재귀 흐름이 좋습니다.");
}
