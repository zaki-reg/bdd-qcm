"use client";

import { MCQQuiz } from "@/components/mcq-quiz";
import type { MCQData } from "@/types/mcq";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";

interface QuizClientProps {
    data: MCQData;
    moduleName: string;
    moduleDescription: string;
}

export function QuizClient({ data, moduleName, moduleDescription }: QuizClientProps) {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto py-6 sm:py-8 px-4">
                <FadeIn>
                    <div className="mb-6">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ChevronLeft className="w-4 h-4" />
                                Back to Modules
                            </Button>
                        </Link>
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="text-center mb-6 sm:mb-8 space-y-2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                            {moduleName}
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                            {moduleDescription}
                        </p>
                    </div>
                </FadeIn>

                <MCQQuiz data={data} />
            </div>
        </main>
    );
}
