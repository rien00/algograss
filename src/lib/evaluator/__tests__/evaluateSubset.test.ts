import { describe, expect, it } from "vitest";
import { evaluateSubset } from "../evaluateSubset";

describe("evaluateSubset", () => {
  it("passes near-correct code", () => {
    expect(evaluateSubset(`if (depth == N) return; selected[depth] = true; subset(depth + 1); selected[depth] = false; subset(depth + 1);`).passed).toBe(true);
  });

  it("passes variable-name variation around values", () => {
    expect(evaluateSubset(`if(depth==N)return; selected[depth]=true; subset(depth+1); selected[depth]=false; subset(depth+1);`).passed).toBe(true);
  });

  it("passes whitespace variation", () => {
    expect(evaluateSubset(`if ( depth == N ) { return; }
      selected [ depth ] = true ; subset ( depth + 1 ) ; selected [ depth ] = false ; subset ( depth + 1 ) ;`).passed).toBe(true);
  });

  it("fails with one recursive branch", () => {
    expect(evaluateSubset(`if(depth==N)return; selected[depth]=true; subset(depth+1);`).passed).toBe(false);
  });

  it("fails completely different algorithm", () => {
    expect(evaluateSubset(`for(int i=start;i<N;i++){ combination(i+1, depth+1); }`).passed).toBe(false);
  });
});
