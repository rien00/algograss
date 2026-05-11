import { describe, expect, it } from "vitest";
import { evaluateBfs } from "../evaluateBfs";

describe("evaluateBfs", () => {
  it("passes near-correct code", () => {
    expect(evaluateBfs(`Queue<Integer> queue = new LinkedList<>(); visited[start] = true; queue.offer(start); while (!queue.isEmpty()) { int current = queue.poll(); for (int next : graph[current]) { if (!visited[next]) { visited[next] = true; queue.offer(next); } } }`).passed).toBe(true);
  });

  it("passes add instead of offer", () => {
    expect(evaluateBfs(`Queue<Integer> queue = new LinkedList<>(); visited[start]=true; queue.add(start); while(!queue.isEmpty()){int current=queue.poll(); for(int next:graph[current]){ if(!visited[next]){ visited[next]=true; queue.add(next); }}}`).passed).toBe(true);
  });

  it("passes whitespace variation", () => {
    expect(evaluateBfs(`Queue < Integer > queue = new LinkedList < > ( ) ;
      visited [ start ] = true ; queue . offer ( start ) ; while ( ! queue . isEmpty ( ) ) { int current = queue . poll ( ) ; for ( int next : graph [ current ] ) { if ( ! visited [ next ] ) { visited [ next ] = true ; queue . offer ( next ) ; } } }`).passed).toBe(true);
  });

  it("fails without start visited", () => {
    expect(evaluateBfs(`Queue<Integer> queue = new LinkedList<>(); queue.offer(start); while(!queue.isEmpty()){int current=queue.poll(); for(int next:graph[current]){ if(!visited[next]){ visited[next]=true; queue.offer(next); }}}`).passed).toBe(false);
  });

  it("fails completely different algorithm", () => {
    expect(evaluateBfs(`visited[current] = true; for (int next : graph[current]) dfs(next);`).passed).toBe(false);
  });
});
