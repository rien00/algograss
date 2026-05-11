"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { EvaluationPanel } from "@/components/EvaluationPanel";
import { GrassCalendar } from "@/components/GrassCalendar";
import { SubmissionHistory } from "@/components/SubmissionHistory";
import { getLocalDateKey } from "@/lib/date";
import { evaluateCode } from "@/lib/evaluator";
import { getAlgorithmSubmissions, getDailySubmissions, saveSubmission } from "@/lib/storage/submissionStorage";
import type { Algorithm, AlgorithmId } from "@/types/algorithm";
import type { DailySubmission, EvaluationResult, Submission } from "@/types/submission";

type Props = {
  algorithm: Algorithm;
};

export function AlgorithmPracticePage({ algorithm }: Props) {
  const [code, setCode] = useState(algorithm.starterCode);
  const [result, setResult] = useState<EvaluationResult>();
  const [history, setHistory] = useState<Submission[]>([]);
  const [dailySubmissions, setDailySubmissions] = useState<DailySubmission[]>([]);
  const [hintLevel, setHintLevel] = useState(1);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [viewedSolution, setViewedSolution] = useState(false);

  useEffect(() => {
    setHistory(getAlgorithmSubmissions(algorithm.id));
    setDailySubmissions(getDailySubmissions());
  }, [algorithm.id]);

  const visibleHints = useMemo(() => algorithm.hints.slice(0, hintLevel), [algorithm.hints, hintLevel]);

  function handleSubmit() {
    const evaluated = evaluateCode(algorithm.id, code);
    const submittedAt = new Date().toISOString();
    const submission: Submission = {
      id: crypto.randomUUID(),
      algorithmId: algorithm.id as AlgorithmId,
      code,
      submittedAt,
      date: getLocalDateKey(new Date(submittedAt)),
      passed: evaluated.passed,
      score: evaluated.score,
      feedback: evaluated.feedback,
      matchedPatterns: evaluated.matchedPatterns,
      missingPatterns: evaluated.missingPatterns,
      viewedSolution,
    };

    saveSubmission(submission);
    setResult(evaluated);
    setHistory(getAlgorithmSubmissions(algorithm.id));
    setDailySubmissions(getDailySubmissions());
  }

  function openSolution() {
    setViewedSolution(true);
    setSolutionOpen(true);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <header className="mb-6 flex items-center justify-between gap-4">
        <Link href="/" className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-green-300">
          목록
        </Link>
        <p className="text-sm text-slate-500">구조 기반 채점 · Java 핵심 메소드</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[0.86fr_1.34fr]">
        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-green-700">{algorithm.nameEn}</p>
            <h1 className="mt-1 text-3xl font-black text-ink">{algorithm.nameKo}</h1>
            <p className="mt-4 leading-7 text-slate-600">{algorithm.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {algorithm.keywords.map((keyword) => (
                <span key={keyword} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-ink">힌트</h2>
              <button
                type="button"
                onClick={() => setHintLevel((level) => Math.min(level + 1, algorithm.hints.length))}
                className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-300"
                disabled={hintLevel >= algorithm.hints.length}
              >
                힌트 더 보기
              </button>
            </div>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {visibleHints.map((hint, index) => (
                <li key={hint} className="rounded-md bg-slate-50 p-3">
                  힌트 {index + 1}. {hint}
                </li>
              ))}
            </ol>
            <button type="button" onClick={openSolution} className="mt-4 w-full rounded-md border border-green-300 bg-green-50 px-4 py-2 text-sm font-bold text-green-800">
              정답 코드 보기
            </button>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-ink">정답 판단 기준</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {algorithm.criteria.map((criterion) => (
                <li key={criterion}>- {criterion}</li>
              ))}
            </ul>
          </section>
        </aside>

        <section className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-ink">핵심 코드 작성</h2>
              <button type="button" onClick={handleSubmit} className="rounded-md bg-green-600 px-5 py-2 text-sm font-bold text-white hover:bg-green-700">
                제출하기
              </button>
            </div>
            <CodeEditor value={code} onChange={setCode} />
          </div>
          <EvaluationPanel result={result} />
        </section>
      </div>

      <div className="mt-6 grid gap-6">
        <SubmissionHistory submissions={history} />
        <GrassCalendar dailySubmissions={dailySubmissions} />
      </div>

      {solutionOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-6">
          <div className="max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-bold text-ink">정답 예시</h2>
              <button type="button" onClick={() => setSolutionOpen(false)} className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700">
                닫기
              </button>
            </div>
            <pre className="overflow-auto bg-slate-950 p-5 text-sm leading-6 text-slate-100">
              <code>{algorithm.solutionCode}</code>
            </pre>
          </div>
        </div>
      )}
    </main>
  );
}
