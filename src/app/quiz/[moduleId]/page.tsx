import { MCQQuiz } from "@/components/mcq-quiz";
import { notFound } from "next/navigation";
import type { MCQData } from "@/types/mcq";
import modulesIndex from "@/data/modules/index.json";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-6 sm:py-8 px-4">
        <div className="mb-6 animate-fade-in">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Modules
            </Button>
          </Link>
        </div>

        <div className="text-center mb-6 sm:mb-8 space-y-2 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            {module?.name || "Quiz"}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            {module?.description || "Test your knowledge"}
          </p>
        </div>

        <MCQQuiz data={data} />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return modulesIndex.modules.map((module) => ({
    moduleId: module.id,
  }));
}
