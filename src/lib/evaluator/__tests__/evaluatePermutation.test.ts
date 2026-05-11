import { describe, expect, it } from "vitest";
import { evaluatePermutation } from "../evaluatePermutation";

describe("evaluatePermutation", () => {
  it("passes near-correct code", () => {
    const result = evaluatePermutation(`if (depth == R) return;
      for (int i = 0; i < N; i++) {
        if (visited[i]) continue;
        selected[depth] = arr[i];
        visited[i] = true;
        permutation(depth + 1);
        visited[i] = false;
      }`);
    expect(result.passed).toBe(true);
  });

  it("passes code with different value variable names", () => {
    const result = evaluatePermutation(`if(depth==selected.length)return;for(int i=0;i<N;i++){if(visited[i])continue;selected[depth]=nums[i];visited[i]=true;permutation(depth+1);visited[i]=false;}`);
    expect(result.passed).toBe(true);
  });

  it("passes code with unusual whitespace", () => {
    const result = evaluatePermutation(`if ( depth == R ) { return; }
      for ( int i = 0 ; i < N ; i++ ) { if ( visited[i] ) continue; selected[depth]=arr[i]; visited[i]=true; permutation(depth + 1); visited[i]=false; }`);
    expect(result.passed).toBe(true);
  });

  it("fails without visited release", () => {
    expect(evaluatePermutation(`if(depth==R)return; for(int i=0;i<N;i++){if(visited[i])continue; selected[depth]=arr[i]; visited[i]=true; permutation(depth+1);}`).passed).toBe(false);
  });

  it("fails completely different algorithm", () => {
    expect(evaluatePermutation(`Queue<Integer> queue = new LinkedList<>(); while(!queue.isEmpty()) queue.poll();`).passed).toBe(false);
  });
});
