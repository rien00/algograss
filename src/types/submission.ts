import type { AlgorithmId } from "./algorithm";

export type EvaluationResult = {
  passed: boolean;
  score: number;
  matchedPatterns: string[];
  missingPatterns: string[];
  feedback: string;
};

export type Submission = {
  id: string;
  algorithmId: AlgorithmId;
  code: string;
  submittedAt: string;
  date: string;
  passed: boolean;
  score: number;
  feedback: string;
  matchedPatterns: string[];
  missingPatterns: string[];
  viewedSolution: boolean;
};

export type DailySubmission = {
  date: string;
  totalSubmissions: number;
  passedSubmissions: number;
  algorithms: {
    algorithmId: AlgorithmId;
    submitted: boolean;
    passed: boolean;
    submittedAt: string;
  }[];
};
