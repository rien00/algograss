import { describe, expect, it } from "vitest";
import { evaluateDp } from "../evaluateDp";

describe("evaluateDp", () => {
  it("passes near-correct code", () => {
    const code = `dp[0] = 0; dp[1] = 1; for(int i=2;i<=N;i++){ dp[i] = Math.max(dp[i - 1], dp[i - 2] + value[i]); } return dp[N];`;
    expect(evaluateDp(code).passed).toBe(true);
  });

  it("passes min transition variation", () => {
    const code = `Arrays.fill(dp, INF); dp[0]=0; for(int i=1;i<=n;i++){ dp[i] = Math.min(dp[i], dp[i-1] + cost[i]); } return dp[n];`;
    expect(evaluateDp(code).passed).toBe(true);
  });

  it("fails without previous state", () => {
    expect(evaluateDp(`dp[0]=0; for(int i=1;i<=N;i++){ dp[i] = value[i]; } return dp[N];`).passed).toBe(false);
  });

  it("fails without dp table", () => {
    expect(evaluateDp(`int answer = 0; for(int i=0;i<N;i++){ answer += value[i]; } return answer;`).passed).toBe(false);
  });
});
