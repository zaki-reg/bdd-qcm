"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Module } from "@/types/mcq";
import {
  Database,
  Binary,
  Network,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

interface ModuleCardProps {
  module: Module;
}

const iconMap = {
  Database: Database,
  Binary: Binary,
  Network: Network,
};

export function ModuleCard({ module }: ModuleCardProps) {
  const Icon = iconMap[module.icon as keyof typeof iconMap] || BookOpen;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "intermediate":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "advanced":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default:
        return "";
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "purple":
        return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      case "green":
        return "text-green-400 bg-green-500/10 border-green-500/20";
      case "orange":
        return "text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "pink":
        return "text-pink-400 bg-pink-500/10 border-pink-500/20";
      default:
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    }
  };

  return (
    <Card className="group border-white/10 bg-card/50 backdrop-blur hover:border-white/20 transition-all duration-300 animate-scale-in">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div
            className={`p-3 rounded-lg border ${getColorClass(module.color)}`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <Badge
            variant="outline"
            className={getDifficultyColor(module.difficulty)}
          >
            {module.difficulty.toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-2">
          <CardTitle className="text-xl sm:text-2xl font-semibold group-hover:text-primary transition-colors">
            {module.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {module.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Questions</span>
          <Badge variant="outline" className="font-semibold">
            {module.questionsCount}
          </Badge>
        </div>

        <Link href={`/quiz/${module.id}`} className="block">
          <Button className="w-full group-hover:bg-primary/90 transition-all active:scale-[0.98]">
            Start Quiz
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
