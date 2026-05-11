import { describe, expect, it } from "vitest";
import { evaluateDfs } from "../evaluateDfs";

describe("evaluateDfs", () => {
  it("passes near-correct code", () => {
    expect(evaluateDfs(`visited[current] = true; for (int next : graph[current]) { if (!visited[next]) { dfs(next); } }`).passed).toBe(true);
  });

  it("passes common parameter variation", () => {
    expect(evaluateDfs(`visited[node]=true; for(int next: graph[node]){ if(!visited[next]) dfs(next); }`).passed).toBe(true);
  });

  it("passes whitespace variation", () => {
    expect(evaluateDfs(`visited [ current ] = true ;
      for ( int next : graph [ current ] ) { if ( ! visited [ next ] ) { dfs ( next ) ; } }`).passed).toBe(true);
  });

  it("fails without recursive call", () => {
    expect(evaluateDfs(`visited[current]=true; for(int next: graph[current]){ if(!visited[next]) visited[next]=true; }`).passed).toBe(false);
  });

  it("fails completely different algorithm", () => {
    expect(evaluateDfs(`Arrays.fill(dist, INF); PriorityQueue<Node> pq = new PriorityQueue<>();`).passed).toBe(false);
  });
});
