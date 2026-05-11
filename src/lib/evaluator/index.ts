import type { AlgorithmId, CodeEvaluator } from "@/types/algorithm";
import { evaluateBacktracking } from "./evaluateBacktracking";
import { evaluateBfs } from "./evaluateBfs";
import { evaluateCombination } from "./evaluateCombination";
import { evaluateDfs } from "./evaluateDfs";
import { evaluateDijkstra } from "./evaluateDijkstra";
import { evaluatePermutation } from "./evaluatePermutation";
import { evaluateSubset } from "./evaluateSubset";

export const evaluators: Record<AlgorithmId, CodeEvaluator> = {
  permutation: { algorithmId: "permutation", evaluate: evaluatePermutation },
  combination: { algorithmId: "combination", evaluate: evaluateCombination },
  subset: { algorithmId: "subset", evaluate: evaluateSubset },
  backtracking: { algorithmId: "backtracking", evaluate: evaluateBacktracking },
  dfs: { algorithmId: "dfs", evaluate: evaluateDfs },
  bfs: { algorithmId: "bfs", evaluate: evaluateBfs },
  dijkstra: { algorithmId: "dijkstra", evaluate: evaluateDijkstra },
};

export function evaluateCode(algorithmId: AlgorithmId, code: string) {
  return evaluators[algorithmId].evaluate(code);
}
