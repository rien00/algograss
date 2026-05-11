"use client";

import type { EvaluationResult } from "@/types/submission";

type Props = {
  result?: EvaluationResult;
};

export function EvaluationPanel({ result }: Props) {
  if (!result) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-bold text-ink">채점 결과</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">코드를 제출하면 구조 기반 채점 결과와 부족한 패턴을 여기에서 확인할 수 있습니다.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-ink">채점 결과</h3>
        <span className={`rounded-full px-3 py-1 text-sm font-bold ${result.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {result.passed ? "통과" : "실패"} · {result.score}점
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <p className="font-semibold text-green-700">맞은 부분</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {result.matchedPatterns.length > 0 ? result.matchedPatterns.map((item) => <li key={item}>- {item}</li>) : <li>- 아직 확인된 패턴이 없습니다.</li>}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-red-700">부족한 부분</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {result.missingPatterns.length > 0 ? result.missingPatterns.map((item) => <li key={item}>- {item}</li>) : <li>- 부족한 핵심 패턴이 없습니다.</li>}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-700">피드백</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{result.feedback}</p>
      </div>
    </section>
  );
}
