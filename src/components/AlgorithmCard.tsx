"use client";

import Link from "next/link";
import type { Algorithm } from "@/types/algorithm";
import type { Submission } from "@/types/submission";

type Props = {
  algorithm: Algorithm;
  latestSubmission?: Submission;
  todaySubmitted: boolean;
  streak: number;
};

export function AlgorithmCard({ algorithm, latestSubmission, todaySubmitted, streak }: Props) {
  const status = latestSubmission
    ? latestSubmission.passed
      ? `최근 통과 ${latestSubmission.score}점`
      : `최근 실패 ${latestSubmission.score}점`
    : "아직 제출 없음";

  return (
    <Link
      href={`/algorithms/${algorithm.id}`}
      className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-green-700">{algorithm.nameEn}</p>
          <h2 className="mt-1 text-2xl font-bold text-ink">{algorithm.nameKo}</h2>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${todaySubmitted ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
          {todaySubmitted ? "오늘 제출" : "오늘 미제출"}
        </span>
      </div>

      <p className="mt-4 min-h-12 text-sm leading-6 text-slate-600">{algorithm.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {algorithm.keywords.map((keyword) => (
          <span key={keyword} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {keyword}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-sm">
        <div>
          <p className="text-slate-500">최근 상태</p>
          <p className={latestSubmission?.passed ? "font-semibold text-green-700" : "font-semibold text-slate-700"}>{status}</p>
        </div>
        <div>
          <p className="text-slate-500">연속 학습</p>
          <p className="font-semibold text-slate-700">{streak}일</p>
        </div>
      </div>
    </Link>
  );
}
