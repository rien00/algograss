"use client";

import { algorithms } from "@/data/algorithms";
import type { Submission } from "@/types/submission";

type Props = {
  submissions: Submission[];
};

export function SubmissionHistory({ submissions }: Props) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-bold text-ink">제출 히스토리</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="py-3 pr-4 font-semibold">제출 시간</th>
              <th className="py-3 pr-4 font-semibold">알고리즘</th>
              <th className="py-3 pr-4 font-semibold">결과</th>
              <th className="py-3 pr-4 font-semibold">점수</th>
              <th className="py-3 pr-4 font-semibold">정답 확인</th>
              <th className="py-3 font-semibold">피드백 요약</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  아직 제출 기록이 없습니다.
                </td>
              </tr>
            ) : (
              submissions.slice(0, 12).map((submission) => {
                const algorithm = algorithms.find((item) => item.id === submission.algorithmId);
                return (
                  <tr key={submission.id} className="border-b border-slate-100">
                    <td className="py-3 pr-4 text-slate-600">{new Date(submission.submittedAt).toLocaleString("ko-KR")}</td>
                    <td className="py-3 pr-4 font-medium text-slate-800">{algorithm?.nameKo ?? submission.algorithmId}</td>
                    <td className={`py-3 pr-4 font-bold ${submission.passed ? "text-green-700" : "text-red-700"}`}>{submission.passed ? "통과" : "실패"}</td>
                    <td className="py-3 pr-4 text-slate-700">{submission.score}</td>
                    <td className="py-3 pr-4 text-slate-600">{submission.viewedSolution ? "봄" : "안 봄"}</td>
                    <td className="max-w-[360px] truncate py-3 text-slate-600">{submission.feedback}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
