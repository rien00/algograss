import { describe, expect, it } from "vitest";
import { evaluatePrim } from "../evaluatePrim";

describe("evaluatePrim", () => {
  it("passes near-correct code", () => {
    const code = `PriorityQueue<Edge> pq = new PriorityQueue<>(); pq.offer(new Edge(start, 0));
      while(!pq.isEmpty()){ Edge current = pq.poll(); if(visited[current.to]) continue;
      visited[current.to] = true; total += current.weight; for(Edge next: graph[current.to]){ if(!visited[next.to]) pq.offer(next); } }`;
    expect(evaluatePrim(code).passed).toBe(true);
  });

  it("passes add variation", () => {
    const code = `PriorityQueue<Node> queue = new PriorityQueue<>(); queue.add(new Node(1,0)); while(!queue.isEmpty()){Node cur=queue.poll(); if(visited[cur.v]) continue; visited[cur.v]=true; sum += cur.cost; for(Node next:graph[cur.v]) queue.add(next);}`;
    expect(evaluatePrim(code).passed).toBe(true);
  });

  it("fails without PriorityQueue", () => {
    const code = `Queue<Edge> pq = new LinkedList<>(); while(!pq.isEmpty()){ Edge current = pq.poll(); visited[current.to]=true; }`;
    expect(evaluatePrim(code).passed).toBe(false);
  });

  it("fails without visited skip", () => {
    const code = `PriorityQueue<Edge> pq = new PriorityQueue<>(); pq.offer(new Edge(start,0)); while(!pq.isEmpty()){ Edge current=pq.poll(); visited[current.to]=true; total += current.weight; }`;
    expect(evaluatePrim(code).passed).toBe(false);
  });
});
