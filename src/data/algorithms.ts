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
  {
    id: "kruskal",
    nameKo: "크루스칼",
    nameEn: "Kruskal",
    summary: "간선을 비용순으로 정렬하고, 사이클이 생기지 않는 간선만 선택하는 MST 알고리즘입니다.",
    keywords: ["MST", "edge sort", "union-find", "cycle"],
    starterCode: `static int kruskal() {
    // 핵심 로직을 작성하세요.
}`,
    hints: ["간선을 비용 기준으로 오름차순 정렬합니다.", "find로 두 정점의 대표가 같은지 확인합니다.", "다른 집합일 때만 union하고 비용을 더합니다."],
    criteria: ["간선 정렬", "간선 순회", "find", "사이클 검사", "union", "비용 누적"],
    solutionCode: `static int kruskal() {
    Collections.sort(edges);
    int total = 0;
    int count = 0;

    for (Edge edge : edges) {
        if (find(edge.from) == find(edge.to)) continue;
        union(edge.from, edge.to);
        total += edge.weight;
        count++;
        if (count == V - 1) break;
    }

    return total;
}`,
  },
  {
    id: "prim",
    nameKo: "프림",
    nameEn: "Prim",
    summary: "하나의 정점에서 시작해 PriorityQueue로 가장 싼 연결 간선을 확장하는 MST 알고리즘입니다.",
    keywords: ["MST", "PriorityQueue", "visited", "graph"],
    starterCode: `static int prim(int start) {
    // 핵심 로직을 작성하세요.
}`,
    hints: ["시작 정점을 PriorityQueue에 넣습니다.", "이미 방문한 정점은 건너뜁니다.", "방문 처리 후 비용을 더하고 인접 간선을 큐에 넣습니다."],
    criteria: ["PriorityQueue", "시작 삽입", "PQ 반복", "방문 건너뛰기", "방문 처리", "비용 누적", "인접 간선 추가"],
    solutionCode: `static int prim(int start) {
    PriorityQueue<Edge> pq = new PriorityQueue<>();
    pq.offer(new Edge(start, 0));
    int total = 0;

    while (!pq.isEmpty()) {
        Edge current = pq.poll();
        if (visited[current.to]) continue;

        visited[current.to] = true;
        total += current.weight;

        for (Edge next : graph[current.to]) {
            if (!visited[next.to]) {
                pq.offer(next);
            }
        }
    }

    return total;
}`,
  },
  {
    id: "disjoint",
    nameKo: "서로소 집합",
    nameEn: "Disjoint Set",
    summary: "parent 배열로 집합의 대표를 관리하고 find/union으로 연결 여부를 빠르게 판단합니다.",
    keywords: ["parent", "find", "union", "path compression"],
    starterCode: `static int find(int x) {
    // 핵심 로직을 작성하세요.
}

static void union(int a, int b) {
    // 핵심 로직을 작성하세요.
}`,
    hints: ["처음에는 parent[i] = i로 초기화합니다.", "find는 대표를 찾고 경로 압축을 적용합니다.", "union은 두 대표가 다를 때 parent를 연결합니다."],
    criteria: ["parent 초기화", "find", "find 종료 조건", "경로 압축", "union", "parent 연결"],
    solutionCode: `static void makeSet() {
    for (int i = 1; i <= N; i++) {
        parent[i] = i;
    }
}

static int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

static void union(int a, int b) {
    int rootA = find(a);
    int rootB = find(b);
    if (rootA == rootB) return;
    parent[rootB] = rootA;
}`,
  },
  {
    id: "topology",
    nameKo: "위상정렬",
    nameEn: "Topological Sort",
    summary: "진입차수가 0인 정점부터 꺼내며 방향 그래프의 선후 관계 순서를 만듭니다.",
    keywords: ["indegree", "Queue", "DAG", "order"],
    starterCode: `static void topologySort() {
    // 핵심 로직을 작성하세요.
}`,
    hints: ["진입차수가 0인 정점을 먼저 큐에 넣습니다.", "정점을 꺼낼 때마다 인접 정점의 진입차수를 줄입니다.", "진입차수가 새로 0이 되면 큐에 넣습니다."],
    criteria: ["indegree 배열", "Queue", "0 진입차수 삽입", "큐 반복", "poll", "인접 순회", "진입차수 감소"],
    solutionCode: `static void topologySort() {
    Queue<Integer> queue = new LinkedList<>();

    for (int i = 1; i <= N; i++) {
        if (indegree[i] == 0) {
            queue.offer(i);
        }
    }

    while (!queue.isEmpty()) {
        int current = queue.poll();
        order.add(current);

        for (int next : graph[current]) {
            indegree[next]--;
            if (indegree[next] == 0) {
                queue.offer(next);
            }
        }
    }
}`,
  },
  {
    id: "dp",
    nameKo: "동적 계획법",
    nameEn: "Dynamic Programming",
    summary: "작은 문제의 답을 저장하고, 이전 상태를 이용해 더 큰 상태의 답을 채웁니다.",
    keywords: ["dp table", "base case", "transition", "memoization"],
    starterCode: `static int solveDp() {
    // 핵심 로직을 작성하세요.
}`,
    hints: ["dp 배열 또는 테이블을 준비합니다.", "기저 상태의 초기값을 먼저 채웁니다.", "반복문으로 상태를 순회하며 이전 상태를 참조해 갱신합니다."],
    criteria: ["DP 배열", "초기값", "상태 순회", "이전 상태 참조", "점화식", "정답 반환"],
    solutionCode: `static int solveDp() {
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= N; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + value[i]);
    }

    return dp[N];
}`,
  },
];

export function getAlgorithmById(id: string): Algorithm | undefined {
  return algorithms.find((algorithm) => algorithm.id === id);
}
