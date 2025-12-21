import { MCQQuiz } from "@/components/mcq-quiz";
import questionsData from "@/data/questions.json";
import type { MCQData } from "@/types/mcq";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-6 sm:py-8 px-4">
        {/* <div className="text-center mb-6 sm:mb-8 space-y-2 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            MCQ Revision Tool
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            Test your knowledge and track your progress
          </p>
        </div> */}
        <MCQQuiz data={questionsData as MCQData} />
      </div>
    </main>
  );
}
