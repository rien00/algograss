import { describe, expect, it } from "vitest";
import { evaluateKruskal } from "../evaluateKruskal";

describe("evaluateKruskal", () => {
  it("passes near-correct code", () => {
    const code = `Collections.sort(edges); int total = 0; int count = 0;
      for (Edge edge : edges) {
        if (find(edge.from) == find(edge.to)) continue;
        union(edge.from, edge.to);
        total += edge.weight;
        count++;
        if (count == V - 1) break;
      }`;
    expect(evaluateKruskal(code).passed).toBe(true);
  });

  it("passes Arrays.sort variation", () => {
    const code = `Arrays.sort(edges); for(Edge e:edges){ if(find(e.a)!=find(e.b)){ union(e.a,e.b); answer += e.cost; cnt++; if(cnt == n - 1) break; } }`;
    expect(evaluateKruskal(code).passed).toBe(true);
  });

  it("fails without edge sort", () => {
    const code = `for(Edge edge:edges){ if(find(edge.from)!=find(edge.to)){ union(edge.from, edge.to); total += edge.weight; } }`;
    expect(evaluateKruskal(code).passed).toBe(false);
  });

  it("fails without union", () => {
    const code = `Collections.sort(edges); for(Edge edge:edges){ if(find(edge.from)!=find(edge.to)){ total += edge.weight; } }`;
    expect(evaluateKruskal(code).passed).toBe(false);
  });
});
