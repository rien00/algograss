import { describe, expect, it } from "vitest";
import { evaluateTopology } from "../evaluateTopology";

describe("evaluateTopology", () => {
  it("passes near-correct code", () => {
    const code = `Queue<Integer> queue = new LinkedList<>();
      for(int i=1;i<=N;i++){ if(indegree[i] == 0) queue.offer(i); }
      while(!queue.isEmpty()){ int current = queue.poll(); order.add(current);
        for(int next: graph[current]){ indegree[next]--; if(indegree[next] == 0) queue.offer(next); } }`;
    expect(evaluateTopology(code).passed).toBe(true);
  });

  it("passes add variation", () => {
    const code = `Queue<Integer> q = new LinkedList<>(); for(int i=0;i<n;i++){if(indegree[i]==0) q.add(i);} while(!q.isEmpty()){int cur=q.poll(); for(int next:graph[cur]){--indegree[next]; if(indegree[next]==0) q.add(next);}}`;
    expect(evaluateTopology(code).passed).toBe(true);
  });

  it("fails without indegree decrement", () => {
    const code = `Queue<Integer> queue = new LinkedList<>(); for(int i=1;i<=N;i++) if(indegree[i]==0) queue.offer(i); while(!queue.isEmpty()){ int current=queue.poll(); for(int next:graph[current]) queue.offer(next); }`;
    expect(evaluateTopology(code).passed).toBe(false);
  });

  it("fails without queue", () => {
    expect(evaluateTopology(`for(int i=1;i<=N;i++){ if(indegree[i]==0) dfs(i); }`).passed).toBe(false);
  });
});
