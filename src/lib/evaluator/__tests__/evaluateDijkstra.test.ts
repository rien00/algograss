import { describe, expect, it } from "vitest";
import { evaluateDijkstra } from "../evaluateDijkstra";

describe("evaluateDijkstra", () => {
  it("passes near-correct code", () => {
    expect(evaluateDijkstra(`Arrays.fill(dist, INF); dist[start] = 0; PriorityQueue<Node> pq = new PriorityQueue<>(); pq.offer(new Node(start, 0)); while (!pq.isEmpty()) { Node current = pq.poll(); if (current.cost > dist[current.vertex]) continue; for (Node next : graph[current.vertex]) { int newCost = dist[current.vertex] + next.cost; if (newCost < dist[next.vertex]) { dist[next.vertex] = newCost; pq.offer(new Node(next.vertex, newCost)); } } }`).passed).toBe(true);
  });

  it("passes add instead of offer", () => {
    expect(evaluateDijkstra(`Arrays.fill(dist, INF); dist[start]=0; PriorityQueue<Node> pq = new PriorityQueue<>(); pq.add(new Node(start,0)); while(!pq.isEmpty()){Node cur=pq.poll(); if(cur.cost > dist[cur.vertex]) continue; for(Node next: graph[cur.vertex]){int newCost=dist[cur.vertex]+next.cost; if(newCost < dist[next.vertex]){dist[next.vertex]=newCost; pq.add(new Node(next.vertex,newCost));}}}`).passed).toBe(true);
  });

  it("passes whitespace variation", () => {
    expect(evaluateDijkstra(`Arrays . fill ( dist , INF ) ; dist [ start ] = 0 ; PriorityQueue < Node > pq = new PriorityQueue < > ( ) ; pq . offer ( new Node ( start , 0 ) ) ; while ( ! pq . isEmpty ( ) ) { Node current = pq . poll ( ) ; if ( current . cost > dist [ current . vertex ] ) continue ; for ( Node next : graph [ current . vertex ] ) { int newCost = dist [ current . vertex ] + next . cost ; if ( newCost < dist [ next . vertex ] ) { dist [ next . vertex ] = newCost ; pq . offer ( new Node ( next . vertex , newCost ) ) ; } } }`).passed).toBe(true);
  });

  it("fails without priority queue", () => {
    expect(evaluateDijkstra(`Arrays.fill(dist, INF); dist[start]=0; Queue<Node> pq = new LinkedList<>(); while(!pq.isEmpty()){Node current=pq.poll();}`).passed).toBe(false);
  });

  it("fails completely different algorithm", () => {
    expect(evaluateDijkstra(`Queue<Integer> queue = new LinkedList<>(); visited[start]=true; queue.offer(start);`).passed).toBe(false);
  });
});
