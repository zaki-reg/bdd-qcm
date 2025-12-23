import { notFound } from "next/navigation";
import type { MCQData } from "@/types/mcq";
import modulesIndex from "@/data/modules/index.json";
import { QuizClient } from "./quiz-client";

interface QuizPageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

async function getModuleData(moduleId: string): Promise<MCQData | null> {
  const module = modulesIndex.modules.find((m) => m.id === moduleId);
  if (!module) return null;

  try {
    const data = await import(`@/data/modules/${module.dataFile}`);
    return data.default;
  } catch {
    return null;
  }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { moduleId } = await params;
  const data = await getModuleData(moduleId);

  if (!data) {
    notFound();
  }

  const module = modulesIndex.modules.find((m) => m.id === moduleId);

  return (
    <QuizClient
      data={data}
      moduleName={module?.name || "Quiz"}
      moduleDescription={module?.description || "Test your knowledge"}
    />
  );
}

export async function generateStaticParams() {
  return modulesIndex.modules.map((module) => ({
    moduleId: module.id,
  }));
}
