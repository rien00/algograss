import type { AlgorithmId, CodeEvaluator } from "@/types/algorithm";
import { evaluateBacktracking } from "./evaluateBacktracking";
import { evaluateBfs } from "./evaluateBfs";
import { evaluateCombination } from "./evaluateCombination";
import { evaluateDfs } from "./evaluateDfs";
import { evaluateDijkstra } from "./evaluateDijkstra";
import { evaluateDisjoint } from "./evaluateDisjoint";
import { evaluateDp } from "./evaluateDp";
import { evaluateKruskal } from "./evaluateKruskal";
import { evaluatePermutation } from "./evaluatePermutation";
import { evaluatePrim } from "./evaluatePrim";
import { evaluateSubset } from "./evaluateSubset";
import { evaluateTopology } from "./evaluateTopology";

export const evaluators: Record<AlgorithmId, CodeEvaluator> = {
  permutation: { algorithmId: "permutation", evaluate: evaluatePermutation },
  combination: { algorithmId: "combination", evaluate: evaluateCombination },
  subset: { algorithmId: "subset", evaluate: evaluateSubset },
  backtracking: { algorithmId: "backtracking", evaluate: evaluateBacktracking },
  dfs: { algorithmId: "dfs", evaluate: evaluateDfs },
  bfs: { algorithmId: "bfs", evaluate: evaluateBfs },
  dijkstra: { algorithmId: "dijkstra", evaluate: evaluateDijkstra },
  kruskal: { algorithmId: "kruskal", evaluate: evaluateKruskal },
  prim: { algorithmId: "prim", evaluate: evaluatePrim },
  disjoint: { algorithmId: "disjoint", evaluate: evaluateDisjoint },
  topology: { algorithmId: "topology", evaluate: evaluateTopology },
  dp: { algorithmId: "dp", evaluate: evaluateDp },
};

export function evaluateCode(algorithmId: AlgorithmId, code: string) {
  return evaluators[algorithmId].evaluate(code);
}
