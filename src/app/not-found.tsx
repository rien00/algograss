import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/" className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
        목록으로
      </Link>
      <h1 className="mt-8 text-3xl font-black text-ink">페이지를 찾을 수 없습니다.</h1>
      <p className="mt-3 text-slate-600">주소를 확인하거나 알고리즘 목록에서 다시 선택하세요.</p>
    </main>
  );
}
