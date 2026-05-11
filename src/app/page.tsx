"use client";

import { useEffect, useState } from "react";
import { AlgorithmCard } from "@/components/AlgorithmCard";
import { GrassCalendar } from "@/components/GrassCalendar";
import { SubmissionHistory } from "@/components/SubmissionHistory";
import { algorithms } from "@/data/algorithms";
import { getLocalDateKey } from "@/lib/date";
import { getDailySubmissions, getLatestSubmission, getLearningStreak, getSubmissions, getTodaySubmission } from "@/lib/storage/submissionStorage";
import type { DailySubmission, Submission } from "@/types/submission";

export default function HomePage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [dailySubmissions, setDailySubmissions] = useState<DailySubmission[]>([]);

  useEffect(() => {
    setSubmissions(getSubmissions());
    setDailySubmissions(getDailySubmissions());
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <header className="flex flex-col gap-4 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">AlgoGrass</p>
          <h1 className="mt-2 text-4xl font-black text-ink">알고리즘 핵심 코드를 매일 작성하고 잔디를 심어보세요.</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Java 핵심 메소드만 직접 작성하고, 문자열 일치가 아닌 알고리즘 흐름 중심의 피드백으로 매일 감각을 쌓습니다.
          </p>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800">
          <p className="font-bold">오늘의 기록</p>
          <p className="mt-1">{submissions.filter((submission) => submission.date === getLocalDateKey()).length}회 제출</p>
        </div>
      </header>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-ink">알고리즘 목록</h2>
          <p className="text-sm text-slate-500">카드를 선택해 연습을 시작하세요.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {algorithms.map((algorithm) => (
            <AlgorithmCard
              key={algorithm.id}
              algorithm={algorithm}
              latestSubmission={getLatestSubmission(algorithm.id)}
              todaySubmitted={Boolean(getTodaySubmission(algorithm.id))}
              streak={getLearningStreak(algorithm.id)}
            />
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-6">
        <GrassCalendar dailySubmissions={dailySubmissions} />
        <SubmissionHistory submissions={submissions} />
      </div>
    </main>
  );
}
