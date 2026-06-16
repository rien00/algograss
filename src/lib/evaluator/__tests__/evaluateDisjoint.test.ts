import { describe, expect, it } from "vitest";
import { evaluateDisjoint } from "../evaluateDisjoint";

describe("evaluateDisjoint", () => {
  it("passes near-correct code", () => {
    const code = `for(int i=1;i<=N;i++) parent[i]=i;
      int find(int x){ if(parent[x] == x) return x; return parent[x] = find(parent[x]); }
      void union(int a, int b){ int rootA=find(a); int rootB=find(b); if(rootA==rootB)return; parent[rootB]=rootA; }`;
    expect(evaluateDisjoint(code).passed).toBe(true);
  });

  it("passes compact variation", () => {
    const code = `for(int idx=0;idx<n;idx++){parent[idx]=idx;} int find(int x){if(parent[x]==x)return x; parent[x]=find(parent[x]); return parent[x];} void union(int a,int b){int pa=find(a);int pb=find(b);parent[pb]=pa;}`;
    expect(evaluateDisjoint(code).passed).toBe(true);
  });

  it("fails without find", () => {
    expect(evaluateDisjoint(`for(int i=0;i<N;i++) parent[i]=i; parent[b]=a;`).passed).toBe(false);
  });

  it("fails without parent initialization", () => {
    expect(evaluateDisjoint(`int find(int x){if(parent[x]==x)return x; return parent[x]=find(parent[x]);} void union(int a,int b){parent[find(b)]=find(a);}`).passed).toBe(false);
  });
});
