"use client";

import type { AlgorithmId } from "@/types/algorithm";
import type { DailySubmission, Submission } from "@/types/submission";
import { getLocalDateKey } from "@/lib/date";

const STORAGE_KEY = "algograss_submissions";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getSubmissions(): Submission[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Submission[]) : [];
  } catch {
    return [];
  }
}

export function saveSubmission(submission: Submission): void {
  if (!isBrowser()) return;
  const submissions = getSubmissions();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([submission, ...submissions]));
}

export function getAlgorithmSubmissions(algorithmId: AlgorithmId): Submission[] {
  return getSubmissions().filter((submission) => submission.algorithmId === algorithmId);
}

export function getLatestSubmission(algorithmId: AlgorithmId): Submission | undefined {
  return getAlgorithmSubmissions(algorithmId)[0];
}

export function getTodaySubmission(algorithmId: AlgorithmId): Submission | undefined {
  const today = getLocalDateKey();
  return getAlgorithmSubmissions(algorithmId).find((submission) => submission.date === today);
}

export function getLearningStreak(algorithmId: AlgorithmId): number {
  const dates = new Set(getAlgorithmSubmissions(algorithmId).map((submission) => submission.date));
  let streak = 0;
  const cursor = new Date();

  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function getDailySubmissions(): DailySubmission[] {
  const grouped = new Map<string, DailySubmission>();

  for (const submission of getSubmissions()) {
    const current =
      grouped.get(submission.date) ??
      {
        date: submission.date,
        totalSubmissions: 0,
        passedSubmissions: 0,
        algorithms: [],
      };

    current.totalSubmissions += 1;
    if (submission.passed) current.passedSubmissions += 1;

    const existing = current.algorithms.find((item) => item.algorithmId === submission.algorithmId);
    if (!existing) {
      current.algorithms.push({
        algorithmId: submission.algorithmId,
        submitted: true,
        passed: submission.passed,
        submittedAt: submission.submittedAt,
      });
    } else {
      existing.passed = existing.passed || submission.passed;
      existing.submittedAt = submission.submittedAt;
    }

    grouped.set(submission.date, current);
  }

  return [...grouped.values()].sort((a, b) => a.date.localeCompare(b.date));
}
