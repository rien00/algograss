import { makeEvaluation, normalizeCode } from "./normalizeCode";
import type { EvaluationResult } from "@/types/submission";

export function evaluatePermutation(code: string): EvaluationResult {
  const { compact, loose } = normalizeCode(code);
  const loopStartsAtZero = /for\s*\([^;]*=\s*0\s*;/.test(loose);
  const loopStartsAtStart = /for\s*\([^;]*=\s*start\s*;/.test(loose);

  const checks = [
    {
      name: "종료 조건",
      passed: /if\s*\([^)]*depth\s*==\s*(r|selected\.length)[^)]*\)/.test(loose),
      feedback: "depth가 목표 길이에 도달했을 때 멈추는 종료 조건이 필요합니다.",
      critical: true,
    },
    {
      name: "0부터 순회하는 반복문",
      passed: loopStartsAtZero && !loopStartsAtStart,
      feedback: "순열은 매 깊이마다 전체 후보를 0부터 다시 확인해야 합니다.",
      critical: true,
    },
    {
      name: "방문 체크",
      passed: /if\s*\(\s*visited\s*\[[^\]]+\]\s*\)\s*continue/.test(loose) || /if\s*\(\s*!visited\s*\[[^\]]+\]\s*\)/.test(loose),
      feedback: "이미 사용한 원소를 건너뛰는 visited 체크가 필요합니다.",
    },
    {
      name: "선택 처리",
      passed: /selected\s*\[\s*depth\s*\]\s*=/.test(loose),
      feedback: "현재 depth 위치에 선택한 값을 넣어야 합니다.",
    },
    {
      name: "방문 표시",
      passed: /visited\s*\[[^\]]+\]\s*=\s*true/.test(loose),
      feedback: "재귀로 들어가기 전에 선택한 원소를 방문 처리해야 합니다.",
    },
    {
      name: "재귀 호출",
      passed: /permutation\s*\([^)]*depth\s*\+\s*1[^)]*\)/.test(loose),
      feedback: "다음 depth로 이동하는 permutation(depth + 1) 호출이 필요합니다.",
      critical: true,
    },
    {
      name: "방문 해제",
      passed: /visited\s*\[[^\]]+\]\s*=\s*false/.test(loose),
      feedback: "다른 경우를 탐색할 수 있도록 재귀 뒤에 visited를 해제해야 합니다.",
      critical: true,
    },
  ];

  void compact;
  return makeEvaluation(checks, "순열의 선택, 재귀, 방문 해제 흐름이 잘 잡혀 있습니다.");
}
