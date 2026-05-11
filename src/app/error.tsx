"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-700">AlgoGrass</p>
      <h1 className="mt-3 text-3xl font-black text-ink">화면을 불러오지 못했습니다.</h1>
      <p className="mt-4 rounded-lg border border-red-100 bg-red-50 p-4 text-sm leading-6 text-red-800">
        {error.message || "개발 서버에서 일시적인 오류가 발생했습니다."}
      </p>
      <button type="button" onClick={reset} className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-bold text-white">
        다시 시도
      </button>
    </main>
  );
}
