"use client";

import { ModuleCard } from "@/components/module-card";
import modulesData from "@/data/modules/index.json";
import type { ModuleList } from "@/types/mcq";
import { GraduationCap } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function Home() {
  const { modules } = modulesData as ModuleList;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <FadeIn delay={0.1}>
          <div className="text-center mb-12 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <GraduationCap className="w-12 h-12 text-primary" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                MCQ Revision Tool
              </h1>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Choose a module to start practicing. Test your knowledge and track
              your progress across multiple subjects.
            </p>
          </div>
        </FadeIn>

        {/* Module Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {modules.map((module) => (
            <StaggerItem key={module.id}>
              <ModuleCard module={module} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats Footer */}
        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 p-6 rounded-lg bg-card/30 backdrop-blur border border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {modules.length}
                </div>
                <div className="text-sm text-muted-foreground">Modules</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {modules.reduce((acc, m) => acc + m.questionsCount, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
