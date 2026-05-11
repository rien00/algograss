import { describe, expect, it } from "vitest";
import { evaluateBacktracking } from "../evaluateBacktracking";

describe("evaluateBacktracking", () => {
  it("passes near-correct code", () => {
    expect(evaluateBacktracking(`if (depth == R) return; for (int i = 0; i < N; i++) { if (!isValid(i)) continue; selected[depth] = arr[i]; backtracking(depth + 1); selected[i] = false; }`).passed).toBe(true);
  });

  it("passes variable-name variation", () => {
    expect(evaluateBacktracking(`if(idx==R)return; for(int i=0;i<N;i++){ if(blocked[i]) continue; path.add(i); backtracking(idx+1); path.remove(path.size()-1); }`).passed).toBe(true);
  });

  it("passes whitespace variation", () => {
    expect(evaluateBacktracking(`if ( depth == R ) { return; } for ( int i = 0 ; i < N ; i++ ) { if ( ! isValid ( i ) ) continue ; visited [ i ] = true ; backtracking ( depth + 1 ) ; visited [ i ] = false ; }`).passed).toBe(true);
  });

  it("fails without pruning", () => {
    expect(evaluateBacktracking(`if(depth==R)return; for(int i=0;i<N;i++){selected[depth]=arr[i]; backtracking(depth+1); selected[i]=false;}`).passed).toBe(false);
  });

  it("fails completely different algorithm", () => {
    expect(evaluateBacktracking(`Queue<Integer> queue = new LinkedList<>(); queue.offer(start);`).passed).toBe(false);
  });
});
