import type { EvaluationResult } from "./submission";

export type AlgorithmId =
  | "permutation"
  | "combination"
  | "subset"
  | "backtracking"
  | "dfs"
  | "bfs"
  | "dijkstra";

export type Algorithm = {
  id: AlgorithmId;
  nameKo: string;
  nameEn: string;
  summary: string;
  keywords: string[];
  starterCode: string;
  hints: string[];
  criteria: string[];
  solutionCode: string;
};

export type CodeEvaluator = {
  algorithmId: AlgorithmId;
  evaluate: (code: string) => EvaluationResult;
};
