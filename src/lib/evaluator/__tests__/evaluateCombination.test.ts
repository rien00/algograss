import { describe, expect, it } from "vitest";
import { evaluateCombination } from "../evaluateCombination";

describe("evaluateCombination", () => {
  it("passes near-correct code", () => {
    expect(evaluateCombination(`if (depth == R) return; for (int i = start; i < N; i++) { selected[depth] = arr[i]; combination(i + 1, depth + 1); }`).passed).toBe(true);
  });

  it("passes variable-name variation", () => {
    expect(evaluateCombination(`if(depth==selected.length)return; for(int i=start;i<N;i++){selected[depth]=nums[i]; combination(i+1, depth+1);}`).passed).toBe(true);
  });

  it("passes whitespace variation", () => {
    expect(evaluateCombination(`if ( depth == R ) { return; }
      for ( int i = start ; i < N ; i++ ) { selected [ depth ] = arr [ i ]; combination ( i + 1 , depth + 1 ); }`).passed).toBe(true);
  });

  it("fails when loop starts at zero", () => {
    expect(evaluateCombination(`if(depth==R)return; for(int i=0;i<N;i++){selected[depth]=arr[i]; combination(i+1, depth+1);}`).passed).toBe(false);
  });

  it("fails completely different algorithm", () => {
    expect(evaluateCombination(`visited[start] = true; dfs(start);`).passed).toBe(false);
  });
});
