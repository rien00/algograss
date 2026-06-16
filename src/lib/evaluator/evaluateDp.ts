import { makeEvaluation, normalizeCode } from "./normalizeCode";
import type { EvaluationResult } from "@/types/submission";

export function evaluateDp(code: string): EvaluationResult {
  const { compact, loose } = normalizeCode(code);
  const checks = [
    {
      name: "DP 배열 사용",
      passed: /\bdp\b/.test(loose) || /dp\[[^\]]+\]/.test(compact),
      feedback: "중복 계산을 저장할 dp 배열이나 테이블이 필요합니다.",
      critical: true,
    },
    {
      name: "초기값 설정",
      passed: /dp\[[^\]]+\]=/.test(compact) || /arrays\.fill\(dp/.test(compact),
      feedback: "점화식을 적용하기 전에 시작 상태의 초기값을 설정해야 합니다.",
      critical: true,
    },
    {
      name: "상태 순회",
      passed: /for\s*\(/.test(loose),
      feedback: "DP 상태를 채우기 위한 반복문이 필요합니다.",
      critical: true,
    },
    {
      name: "이전 상태 참조",
      passed: /dp\[[^\]]*[-+][^\]]*\]/.test(compact) || /dp\[[^\]]+\]\[[^\]]*[-+][^\]]*\]/.test(compact),
      feedback: "현재 상태는 이전 상태 dp[i - 1], dp[i - cost] 등을 참조해야 합니다.",
      critical: true,
    },
    {
      name: "점화식 갱신",
      passed: /dp\[[^\]]+\]=/.test(compact) && (/math\.(max|min)\(/.test(compact) || /dp\[[^\]]+\][+-]/.test(compact) || /\+dp\[[^\]]+\]/.test(compact)),
      feedback: "현재 상태를 이전 상태로부터 갱신하는 점화식이 필요합니다.",
      critical: true,
    },
    {
      name: "정답 반환 또는 출력",
      passed: /(return|system\.out\.print)/.test(compact),
      feedback: "채운 DP 테이블에서 최종 답을 반환하거나 출력해야 합니다.",
    },
  ];

  return makeEvaluation(checks, "DP의 초기값, 상태 순회, 이전 상태 기반 점화식 흐름이 잘 표현되어 있습니다.");
}
