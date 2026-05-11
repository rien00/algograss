import { notFound } from "next/navigation";
import { AlgorithmPracticePage } from "@/components/AlgorithmPracticePage";
import { algorithms, getAlgorithmById } from "@/data/algorithms";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return algorithms.map((algorithm) => ({
    id: algorithm.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const algorithm = getAlgorithmById(id);

  if (!algorithm) {
    return {
      title: "알고리즘을 찾을 수 없습니다",
    };
  }

  return {
    title: `${algorithm.nameKo} 연습`,
    description: `${algorithm.nameKo} 핵심 Java 코드를 작성하고 구조 기반 피드백을 확인하세요.`,
  };
}

export default async function AlgorithmDetailPage({ params }: Props) {
  const { id } = await params;
  const algorithm = getAlgorithmById(id);

  if (!algorithm) {
    notFound();
  }

  return <AlgorithmPracticePage algorithm={algorithm} />;
}
