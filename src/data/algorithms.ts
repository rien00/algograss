import type { Algorithm } from "@/types/algorithm";

export const algorithms: Algorithm[] = [
  {
    id: "permutation",
    nameKo: "순열",
    nameEn: "Permutation",
    summary: "서로 다른 원소를 순서를 고려해 뽑는 재귀 탐색입니다.",
    keywords: ["visited", "depth", "swap-free", "backtrack"],
    starterCode: `static void permutation(int depth) {
    // 핵심 로직을 작성하세요.
}`,
    hints: ["depth가 R에 도달하면 종료합니다.", "매 depth마다 i = 0부터 모든 후보를 확인합니다.", "재귀 후 visited[i]를 false로 되돌립니다."],
    criteria: ["종료 조건", "0부터 순회", "visited 체크", "선택", "재귀", "visited 해제"],
    solutionCode: `static void permutation(int depth) {
    if (depth == R) {
        return;
    }

    for (int i = 0; i < N; i++) {
        if (visited[i]) continue;
        selected[depth] = arr[i];
        visited[i] = true;
        permutation(depth + 1);
        visited[i] = false;
    }
}`,
  },
  {
    id: "combination",
    nameKo: "조합",
    nameEn: "Combination",
    summary: "순서 없이 R개를 고르기 위해 start 인덱스로 후보 범위를 줄입니다.",
    keywords: ["start", "depth", "i + 1", "no duplicate"],
    starterCode: `static void combination(int start, int depth) {
    // 핵심 로직을 작성하세요.
}`,
    hints: ["depth == R이면 종료합니다.", "반복문은 start부터 시작합니다.", "다음 호출에는 i + 1을 넘깁니다."],
    criteria: ["종료 조건", "start부터 순회", "선택", "combination(i + 1, depth + 1)"],
    solutionCode: `static void combination(int start, int depth) {
    if (depth == R) {
        return;
    }

    for (int i = start; i < N; i++) {
        selected[depth] = arr[i];
        combination(i + 1, depth + 1);
    }
}`,
  },
  {
    id: "subset",
    nameKo: "부분집합",
    nameEn: "Subset",
    summary: "각 원소를 선택하거나 선택하지 않는 두 갈래 재귀입니다.",
    keywords: ["include", "exclude", "binary recursion", "depth"],
    starterCode: `static void subset(int depth) {
    // 핵심 로직을 작성하세요.
}`,
    hints: ["depth == N이면 모든 원소를 판단한 상태입니다.", "selected[depth] = true 분기를 만듭니다.", "selected[depth] = false 분기도 같은 depth + 1로 탐색합니다."],
    criteria: ["종료 조건", "선택 분기", "비선택 분기", "두 번의 재귀"],
    solutionCode: `static void subset(int depth) {
    if (depth == N) {
        return;
    }

    selected[depth] = true;
    subset(depth + 1);
    selected[depth] = false;
    subset(depth + 1);
}`,
  },
  {
    id: "backtracking",
    nameKo: "백트래킹",
    nameEn: "Backtracking",
    summary: "후보를 선택해 재귀로 들어가고, 불가능한 경우를 가지치기합니다.",
    keywords: ["candidate", "pruning", "choose", "undo"],
    starterCode: `static void backtracking(int depth) {
    // 핵심 로직을 작성하세요.
}`,
    hints: ["종료 조건을 먼저 세웁니다.", "후보를 반복문으로 순회합니다.", "선택 후 재귀, 재귀 후 선택 취소가 한 묶음입니다."],
    criteria: ["종료 조건", "후보 반복", "가지치기", "선택", "재귀", "선택 취소"],
    solutionCode: `static void backtracking(int depth) {
    if (depth == R) {
        return;
    }

    for (int i = 0; i < N; i++) {
        if (!isValid(i)) continue;
        selected[depth] = arr[i];
        visited[i] = true;
        backtracking(depth + 1);
        visited[i] = false;
    }
}`,
  },
  {
    id: "dfs",
    nameKo: "DFS",
    nameEn: "Depth First Search",
    summary: "현재 노드에서 가능한 한 깊게 들어가는 재귀 그래프 탐색입니다.",
    keywords: ["visited", "graph[current]", "recursive", "next"],
    starterCode: `static void dfs(int current) {
    // 핵심 로직을 작성하세요.
}`,
    hints: ["현재 노드를 방문 처리합니다.", "graph[current]의 next를 순회합니다.", "방문하지 않은 next만 dfs(next)로 들어갑니다."],
    criteria: ["현재 노드 방문", "인접 노드 순회", "미방문 조건", "dfs(next)"],
    solutionCode: `static void dfs(int current) {
    visited[current] = true;

    for (int next : graph[current]) {
        if (!visited[next]) {
            dfs(next);
        }
    }
}`,
  },
  {
    id: "bfs",
    nameKo: "BFS",
    nameEn: "Breadth First Search",
    summary: "Queue를 사용해 가까운 노드부터 차례로 방문하는 그래프 탐색입니다.",
    keywords: ["Queue", "offer", "poll", "visited"],
    starterCode: `static void bfs(int start) {
    // 핵심 로직을 작성하세요.
}`,
    hints: ["Queue<Integer>를 준비합니다.", "시작점을 큐에 넣을 때 visited[start] = true로 표시합니다.", "next도 큐에 넣기 전에 방문 처리합니다."],
    criteria: ["Queue 사용", "시작 방문", "while queue", "poll", "인접 순회", "next 방문 후 삽입"],
    solutionCode: `static void bfs(int start) {
    Queue<Integer> queue = new LinkedList<>();
    visited[start] = true;
    queue.offer(start);

    while (!queue.isEmpty()) {
        int current = queue.poll();
        for (int next : graph[current]) {
            if (!visited[next]) {
                visited[next] = true;
                queue.offer(next);
            }
        }
    }
}`,
  },
  {
    id: "dijkstra",
    nameKo: "다익스트라",
    nameEn: "Dijkstra",
    summary: "PriorityQueue로 현재 가장 짧은 후보 경로를 확장하는 최단거리 알고리즘입니다.",
    keywords: ["dist", "INF", "PriorityQueue", "relaxation"],
    starterCode: `static void dijkstra(int start) {
    // 핵심 로직을 작성하세요.
}`,
    hints: ["dist를 INF로 초기화하고 dist[start] = 0으로 둡니다.", "PriorityQueue에서 가장 짧은 후보를 poll합니다.", "newCost가 더 짧을 때만 갱신하고 PQ에 넣습니다."],
    criteria: ["dist 초기화", "PriorityQueue", "오래된 값 continue", "인접 순회", "더 짧을 때 갱신"],
    solutionCode: `static void dijkstra(int start) {
    Arrays.fill(dist, INF);
    dist[start] = 0;
    PriorityQueue<Node> pq = new PriorityQueue<>();
    pq.offer(new Node(start, 0));

    while (!pq.isEmpty()) {
        Node current = pq.poll();
        if (current.cost > dist[current.vertex]) continue;

        for (Node next : graph[current.vertex]) {
            int newCost = dist[current.vertex] + next.cost;
            if (newCost < dist[next.vertex]) {
                dist[next.vertex] = newCost;
                pq.offer(new Node(next.vertex, newCost));
            }
        }
    }
}`,
  },
];

export function getAlgorithmById(id: string): Algorithm | undefined {
  return algorithms.find((algorithm) => algorithm.id === id);
}
